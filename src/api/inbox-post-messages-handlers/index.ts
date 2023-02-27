import { IWidgetExtended } from '../../interfaces/widget-extended.interface.js';
import { getCrmContextPostMessageHandler } from './get-crm-context.message-handler.js';

export function bindAndSubscribeInboxHandlers(this: IWidgetExtended) {
  this.postMessageTransport.subscribe(
    'getCrmContextRequest',
    getCrmContextPostMessageHandler.bind(this)
  );
}
