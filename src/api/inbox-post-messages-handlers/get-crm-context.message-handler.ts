import { IWidgetExtended } from '../../interfaces/widget-extended.interface';
import { IPostMessage } from '../../modules/PostMessageTransport';
import { constants as Constants } from '../../types/AMOCRM';
import { ISystem, IWidgetSettings } from '../../types/IWidget';

interface IGetCrmContextResponse {
  settings: IWidgetSettings;
  system: ISystem;
  constants: {
    user_rights: Constants['user_rights'];
  };
  isCard: boolean;
  cardId: number | false;
}

export function getCrmContextMessageHandler(
  this: IWidgetExtended,
  { action, backwardAction }: IPostMessage<any>
) {
  this.postMessageTransport.post<IGetCrmContextResponse>({
    action: backwardAction || action,
    payload: {
      settings: this.get_settings(),
      system: this.system(),
      constants: {
        user_rights: window.AMOCRM.constant('user_rights'),
      },
      isCard:
        window.AMOCRM.isCard() && window.AMOCRM.getBaseEntity() === 'leads',
      cardId:
        window.AMOCRM.data.current_card && window.AMOCRM.data.current_card.id,
    },
  });
}
