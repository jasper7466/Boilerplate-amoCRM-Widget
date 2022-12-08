import { IWidgetSettings, ISystem } from '../types/IWidget';
import { IWidget } from '../types/IWidget';
import { constants } from '../types/AMOCRM';
import { PostMessageTransport } from '../modules/PostMessageTransport.js';
import { config } from '../config.js';

type OutboxMessages = {
  getCrmContextResponse: {
    settings: IWidgetSettings;
    system: ISystem;
    constants: {
      user_rights: constants['user_rights'];
    };
    isCard: boolean;
    cardId: number | false;
  };
};

const postMessageTransport = new PostMessageTransport<OutboxMessages>(
  '#test',
  config.iframeURL,
);

const getCrmContextMessageHandler = function (this: IWidget) {
  postMessageTransport.postMessage('getCrmContextResponse', {
    settings: this.get_settings(),
    system: this.system(),
    constants: {
      user_rights: window.AMOCRM.constant('user_rights'),
    },
    isCard: window.AMOCRM.isCard() && window.AMOCRM.getBaseEntity() === 'leads',
    cardId:
      window.AMOCRM.data.current_card && window.AMOCRM.data.current_card.id,
  });
};

export const bindAndSubscribeInboxHandlers = (context: IWidget) => {
  postMessageTransport.subscribe(
    'getCrmContextRequest',
    getCrmContextMessageHandler.bind(context),
  );
};
