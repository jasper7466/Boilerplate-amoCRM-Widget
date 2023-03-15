import { IWidgetExtended } from './../interfaces/widget-extended.interface';
import { renderSettings } from '../utils/renderSettings';

const settings = function (this: IWidgetExtended) {
  console.log('settings');
  renderSettings.call(this);
};

export { settings };
