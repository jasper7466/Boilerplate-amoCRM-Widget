import { IWidget } from '../Types/IWidget';
import { onEvent } from '../utils/onEvent.js';
import { renderModal } from '../utils/renderModal.js';

const bindActions = function (this: IWidget) {
  console.log('bind actions');
  onEvent('click', '.custom-widget__open-button', () => renderModal.call(this));
};

export { bindActions };
