import { IWidget } from '../Types/IWidget';
import { loadTemplate } from './loadTemplate.js';

export const renderInPanel = function (this: IWidget, callback?: () => void) {
  loadTemplate.call(this, 'side-panel', {}, (html) => {
    this.render_template({
      caption: {
        class_name: 'custom-widget__panel',
      },
      body: html,
      render: '',
    });

    if (callback) {
      callback();
    }
  });
};
