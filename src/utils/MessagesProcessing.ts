import { IWidgetSettings, ISystem } from '../types/IWidget';
import { IWidget } from '../types/IWidget';
import { constants } from '../types/AMOCRM';
import { PostMessageTransport } from '../modules/PostMessageTransport.js';

type OutboxMessages = {
  getCrmContextResponse: {
    settings: IWidgetSettings;
    system: ISystem;
    constants: {
      user_rights: constants['user_rights'];
    };
  };
};

const postMessageTransport = new PostMessageTransport<OutboxMessages>('#test');

const getCrmContextMessageHandler = function (this: IWidget) {
  postMessageTransport.postMessage('getCrmContextResponse', {
    settings: this.get_settings(),
    system: this.system(),
    constants: {
      user_rights: window.AMOCRM.constant('user_rights'),
    },
  });
};

export const bindAndSubscribeInboxHandlers = (context: IWidget) => {
  postMessageTransport.subscribe(
    'getCrmContextRequest',
    getCrmContextMessageHandler.bind(context),
  );
};
