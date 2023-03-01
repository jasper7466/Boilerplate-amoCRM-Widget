import { IWidgetExtended } from '../interfaces/widget-extended.interface.js';
import { getCrmContextMessageHandler } from './inbox-post-messages-handlers/get-crm-context.message-handler.js';
import { httpProxyMessageHandler } from './inbox-post-messages-handlers/http-proxy.message-handler.js';

export function bindAndSubscribeInboxHandlers(this: IWidgetExtended): void {
  this.postMessageTransport
    .subscribe('getCrmContextRequest', getCrmContextMessageHandler.bind(this))
    .subscribe('httpProxyRequest', httpProxyMessageHandler.bind(this));
}
