import { IWidget } from '../types/IWidget';
import { renderInPanel } from '../utils/renderInPanel.js';

const render = function (this: IWidget) {
  console.log('render');

  if (
    window.AMOCRM.data.current_card &&
    window.AMOCRM.data.current_card.id !== 0
  ) {
    renderInPanel.call(this);
  }
};

export { render };
