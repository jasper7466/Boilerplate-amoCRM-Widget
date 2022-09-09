import { IWidgetCallbacks } from '../types/IWidget';
import { IWidget } from '../types/IWidget';
import { handlers } from '../handlers/root.js';

export class WidgetCallbacks implements IWidgetCallbacks {
  widget: IWidget;

  constructor(widget: IWidget) {
    this.widget = widget;
  }

  render() {
    handlers.render.call(this.widget);
    return true;
  }

  init() {
    handlers.init.call(this.widget);
    return true;
  }

  bind_actions() {
    handlers.bindActions.call(this.widget);
    return true;
  }

  settings() {
    handlers.settings.call(this.widget);
  }

  dpSettings() {
    handlers.dpSettings.call(this.widget);
  }

  advancedSettings() {
    handlers.advancedSettings.call(this.widget);
  }

  onSave() {
    handlers.onSave.call(this.widget);
    return true;
  }

  destroy() {
    handlers.destroy.call(this.widget);
  }

  onSource() {
    handlers.onSource.call(this.widget);
  }

  onSalesbotDesignerSave(handlerCode: any, params: any) {
    handlers.onSalesbotDesignerSave.call(this.widget, handlerCode, params);
  }

  onAddAsSource(pipeline_id: any) {
    handlers.onAddAsSource.call(this.widget, pipeline_id);
  }

  private leadsSelected() {
    handlers.leadsSelected.call(this.widget);
  }

  private contactsSelected() {
    handlers.contactsSelected.call(this.widget);
  }

  private todoSelected() {
    handlers.todoSelected.call(this.widget);
  }

  leads = {
    selected: this.leadsSelected,
  };

  contacts = {
    selected: this.contactsSelected,
  };

  todo = {
    selected: this.todoSelected,
  };
}
