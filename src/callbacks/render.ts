import { IWidgetExtended } from './../interfaces/widget-extended.interface';
import { renderInPanel } from '../utils/renderInPanel';

const render = function (this: IWidgetExtended) {
  console.log('render');

  if (
    window.AMOCRM.data.current_card &&
    window.AMOCRM.data.current_card.id !== 0
  ) {
    renderInPanel.call(this);
  }
};

export { render };
