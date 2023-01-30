import { IWidget } from '../types/IWidget';
import { loadTemplate } from './loadTemplate';

export const renderInPanel = function (this: IWidget, callback?: () => void) {
  loadTemplate.call(this, 'side-panel', {}, (html) => {
    this.render_template({
      caption: {
        class_name: `custom-widget__side-panel ${this.params.widget_code}`,
      },
      body: html,
      render: '',
    });

    if (callback) {
      callback();
    }
  });
};
