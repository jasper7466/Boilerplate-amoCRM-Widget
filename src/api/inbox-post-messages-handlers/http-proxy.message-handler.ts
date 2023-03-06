import { Indexed, Writeable } from './../../types/common';
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
  body: string;
}

interface IPostMessageXhrEvent
  extends Writeable<
    Partial<Pick<ProgressEvent, 'lengthComputable' | 'loaded' | 'total'>>
  > {
  type: keyof XMLHttpRequestEventMap | 'unexpected-error';
  status?: number;
  readyState?: READY_STATE;
  description?: string;
  data?: string;
  responseUrl?: string;
}

export async function httpProxyMessageHandler(
  this: IWidgetExtended,
  { payload, action, backwardAction }: IPostMessage<IPostMessageXhrConfig>,
) {
  console.log(payload);

  const xhr = new XMLHttpRequest();

  try {
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
          readyState: xhr.readyState,
          status: xhr.status,
        };

        if (event instanceof ProgressEvent) {
          payload.lengthComputable = event.lengthComputable;
          (payload.loaded = event.loaded), (payload.total = event.total);
        }

        this.postMessageTransport.post<IPostMessageXhrEvent>({
          action: backwardAction || action,
          payload,
        });
      });
    }

    xhr.send(JSON.parse(payload.body));
  } catch (error) {
    if (!(error instanceof Error)) {
      throw error;
    }
    this.postMessageTransport.post<IPostMessageXhrEvent>({
      action: backwardAction || action,
      payload: {
        type: 'unexpected-error',
        description: `${error.name}: ${error.message}`,
      },
    });
  }
}
