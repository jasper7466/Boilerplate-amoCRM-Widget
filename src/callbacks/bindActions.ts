import { bindAndSubscribeInboxHandlers } from './../utils/MessagesProcessing';
import { IWidget } from '../types/IWidget';
import { onEvent } from '../utils/onEvent';
import { renderModal } from '../utils/renderModal';

const bindActions = function (this: IWidget) {
  console.log('bind actions');
  onEvent('click', `.side-panel__open-button.${this.params.widget_code}`, () =>
    renderModal.call(this)
  );
  bindAndSubscribeInboxHandlers(this);
};

export { bindActions };
