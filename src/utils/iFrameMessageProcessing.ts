import { IWidget } from '../types/IWidget';
import { FrameTransport } from '../modules/FrameTransport.js';
import { indexed } from '../types/common.js';

const inboxHandlers: indexed<(data: indexed<any>) => void> = {
  // @ts-ignore
  test: function (this: IWidget, data: indexed<any>) {
    console.log(this.get_settings());
  },
};

const bindInboxHandlers = (context: IWidget) => {
  for (let handler in inboxHandlers) {
    if (typeof inboxHandlers[handler] == 'function') {
      inboxHandlers[handler] = inboxHandlers[handler].bind(context);
    }
  }
};

const frameTransport = new FrameTransport('#test', inboxHandlers);

export { frameTransport, bindInboxHandlers };
