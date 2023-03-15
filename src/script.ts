import { WidgetCallbacks } from './modules/WidgetCallbacks';
import { IAMOCRM } from './types/AMOCRM';
import { IWidgetExtended } from './interfaces/widget-extended.interface';
import { PostMessageTransport } from './modules/PostMessageTransport';
import { config } from './config';

declare global {
  interface Window {
    AMOCRM: IAMOCRM;
  }
}

const Widget = function (this: IWidgetExtended) {
  this.callbacks = new WidgetCallbacks(this);
  this.postMessageTransport = new PostMessageTransport(
    '#main-iframe',
    config.iframeURL,
  );
  this.xhrList = {};
};

export = Widget;
