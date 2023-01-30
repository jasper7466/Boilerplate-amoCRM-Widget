import { config } from './../config';
import { IWidget } from '../types/IWidget';
import { loadTemplate } from './loadTemplate';
// @ts-ignore (системный модуль, предоставляемый в среде выполнения amoCRM)
import Modal = require('lib/components/base/modal');
import $ from 'jquery';

export const renderModal = function (this: IWidget): void {
  loadTemplate.call(this, 'iframe', { url: config.iframeURL }, function (html) {
    new Modal({
      class_name: 'custom-widget__iframe-modal',
      init: function ($modalBody: typeof $) {
        this.$modalBody = $modalBody as typeof $;
        this.$modalBody
          .trigger('modal:loaded') // запускает отображение модального окна
          .html(html)
          .trigger('modal:centrify') // настраивает модальное окно
          .append('');
      },
      destroy: function () {},
    });
  });
};
