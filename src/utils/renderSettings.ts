import { config } from './../config';
import { IWidget } from '../types/IWidget';
import { loadTemplate } from './loadTemplate';
// @ts-ignore (системный модуль, предоставляемый в среде выполнения amoCRM)
import Modal = require('lib/components/base/modal');
import $ from 'jquery';

export const renderSettings = function (this: IWidget): void {
  const widgetCode = this.params.widget_code;

  loadTemplate.call(
    this,
    'settings-footer',
    { url: config.getApiKeyURL },
    function (html) {
      $(`.widget-settings__modal.${widgetCode}`)
        .find('.widget_settings_block')
        .first()
        .append(html);
    },
  );
};
