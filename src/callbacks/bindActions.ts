import { bindAndSubscribeInboxHandlers } from '../api/index';
import { IWidgetExtended } from '../interfaces/widget-extended.interface';
import { onEvent } from '../utils/onEvent';
import { renderModal } from '../utils/renderModal';

const bindActions = function (this: IWidgetExtended) {
  console.log('bind actions');
  onEvent('click', `.side-panel__open-button.${this.params.widget_code}`, () =>
    renderModal.call(this)
  );

  bindAndSubscribeInboxHandlers.call(this);
};

export { bindActions };
