import { bindAndSubscribeInboxHandlers } from './../utils/MessagesProcessing.js';
import { IWidget } from '../types/IWidget';
import { onEvent } from '../utils/onEvent.js';
import { renderModal } from '../utils/renderModal.js';

const bindActions = function (this: IWidget) {
  console.log('bind actions');
  onEvent('click', `.side-panel__open-button.${this.params.widget_code}`, () =>
    renderModal.call(this),
  );
  bindAndSubscribeInboxHandlers(this);
};

export { bindActions };