import { IWidgetExtended } from '../../interfaces/widget-extended.interface';
import { IPostMessage } from '../../modules/PostMessageTransport';

interface IPayload {
  url: string;
  requestOptions: RequestInit;
}

export async function httpProxyMessageHandler(
  this: IWidgetExtended,
  { payload, action, backwardAction }: IPostMessage<IPayload>
) {
  const response = await fetch(payload.url, payload.requestOptions);
  const body = await response.json();

  this.postMessageTransport.post<any>({
    action: backwardAction || action,
    payload: JSON.stringify(body),
  });
}
