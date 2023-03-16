import { Indexed } from './../../types/common';
import { IWidgetExtended } from '../../interfaces/widget-extended.interface';
import { IPostMessage } from '../../modules/PostMessageTransport';

enum READY_STATE {
  Unsent = 0,
  Opened = 1,
  HeadersReceived = 2,
  Loading = 3,
  Done = 4,
}

interface IPostMessageXhrConfig {
  timeout: number;
  withCredentials: boolean;
  method: string;
  url: string;
  user: string | null;
  password: string | null;
  headers: Indexed<string>;
  eventsToTrack: Array<keyof XMLHttpRequestEventMap>;
  responseType: XMLHttpRequestResponseType;
  bodyString: string;
}

interface IXhrState {
  readyState: READY_STATE;
  progress: {
    lengthComputable: boolean;
    loaded: number;
    total: number;
  };
  status?: number;
  statusText?: string;
  responseUrl?: string;
  headersString?: string;
  response?: string;
  responseText?: string;
}

interface IAdditionalActions {
  abort?: boolean;
}

interface IPostMessageXhrEvent {
  type: keyof XMLHttpRequestEventMap | 'unexpected-error';
  description?: string;
  state: Partial<IXhrState>;
}

export async function httpProxyMessageHandler(
  this: IWidgetExtended,
  {
    payload,
    action,
    backwardAction,
  }: IPostMessage<IPostMessageXhrConfig & IAdditionalActions>,
) {
  const sessionGuid = backwardAction || action;

  try {
    if (payload.abort) {
      this.xhrList[sessionGuid].abort();
      delete this.xhrList[sessionGuid];
      return;
    }

    const xhr = new XMLHttpRequest();
    this.xhrList[sessionGuid] = xhr;

    xhr.open(payload.method, payload.url, true, payload.user, payload.password);
    xhr.timeout = payload.timeout;
    xhr.withCredentials = payload.withCredentials;
    xhr.responseType = payload.responseType;

    for (const [header, value] of Object.entries(payload.headers)) {
      xhr.setRequestHeader(header, value);
    }

    const uniqEvents = Array.from(
      new Set<keyof XMLHttpRequestEventMap>(payload.eventsToTrack),
    );

    for (const eventType of uniqEvents) {
      xhr.addEventListener(eventType, (event) => {
        let payload: IPostMessageXhrEvent = {
          type: event.type as IPostMessageXhrEvent['type'],
          state: {},
        };

        if (event instanceof ProgressEvent) {
          payload.state.progress = {
            lengthComputable: event.lengthComputable,
            loaded: event.loaded,
            total: event.total,
          };
        }

        if (event.type === 'readystatechange') {
          payload.state.readyState = xhr.readyState;
          payload.state.status = xhr.status;
          payload.state.statusText = xhr.statusText;
          payload.state.responseUrl = xhr.responseURL;

          if (xhr.readyState === xhr.HEADERS_RECEIVED) {
            payload.state.headersString = xhr.getAllResponseHeaders();
          }

          if (xhr.readyState === xhr.DONE) {
            payload.state.response = xhr.response;
          }
        }

        this.postMessageTransport.post<IPostMessageXhrEvent>({
          action: backwardAction || action,
          payload,
        });

        if (xhr.readyState === xhr.DONE) {
          delete this.xhrList[sessionGuid];
        }
      });
    }

    xhr.send(JSON.parse(payload.bodyString));
  } catch (error) {
    delete this.xhrList[sessionGuid];

    if (!(error instanceof Error)) {
      throw error;
    }
    this.postMessageTransport.post<IPostMessageXhrEvent>({
      action: backwardAction || action,
      payload: {
        type: 'unexpected-error',
        description: `${error.name}: ${error.message}`,
        state: {},
      },
    });
  }
}
