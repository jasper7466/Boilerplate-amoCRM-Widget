import { PostMessageTransport } from '../modules/PostMessageTransport';
import { IWidget } from '../types/IWidget';

export interface IWidgetExtended extends IWidget {
  postMessageTransport: PostMessageTransport;
}
