import { IWidget } from './types';
import { WidgetCallbacks } from './modules/WidgetCallbacks.js';

const Widget = function (this: IWidget) {
  this.callbacks = new WidgetCallbacks(this);
};

export = Widget;
