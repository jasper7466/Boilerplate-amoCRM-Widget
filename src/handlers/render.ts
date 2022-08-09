import { IWidget } from '../types/IWidget';
import { renderInPanel } from '../utils/renderInPanel.js';

const render = function (this: IWidget) {
  console.log('render');
  renderInPanel.call(this);
};

export { render };
