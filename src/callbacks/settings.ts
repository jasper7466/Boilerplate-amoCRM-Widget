import { IWidget } from '../types/IWidget';
import { renderSettings } from '../utils/renderSettings.js';

const settings = function (this: IWidget) {
  console.log('settings');
  renderSettings.call(this);
};

export { settings };