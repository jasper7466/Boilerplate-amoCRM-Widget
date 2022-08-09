import { IWidget } from './Types/IWidget';
import { WidgetCallbacks } from './modules/WidgetCallbacks.js';
import { IAMOCRM } from './Types/AMOCRM';

declare global {
  interface Window {
    AMOCRM: IAMOCRM;
  }
}

const Widget = function (this: IWidget) {
  this.callbacks = new WidgetCallbacks(this);
};

export = Widget;
