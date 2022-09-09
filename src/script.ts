import { IWidget } from './types/IWidget';
import { WidgetCallbacks } from './modules/WidgetCallbacks.js';
import { IAMOCRM } from './types/AMOCRM';

declare global {
  interface Window {
    AMOCRM: IAMOCRM;
  }
}

const Widget = function (this: IWidget) {
  this.callbacks = new WidgetCallbacks(this);
};

export = Widget;
