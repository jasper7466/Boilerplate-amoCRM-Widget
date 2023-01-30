import { callbacks } from './../callbacks/index';
import { IWidgetCallbacks } from '../types/IWidget';
import { IWidget } from '../types/IWidget';

export class WidgetCallbacks implements IWidgetCallbacks {
  widget: IWidget;

  constructor(widget: IWidget) {
    this.widget = widget;
  }

  render() {
    callbacks.render.call(this.widget);
    return true;
  }

  init() {
    callbacks.init.call(this.widget);
    return true;
  }

  bind_actions() {
    callbacks.bindActions.call(this.widget);
    return true;
  }

  settings() {
    callbacks.settings.call(this.widget);
  }

  dpSettings() {
    callbacks.dpSettings.call(this.widget);
  }

  advancedSettings() {
    callbacks.advancedSettings.call(this.widget);
  }

  onSave() {
    callbacks.onSave.call(this.widget);
    return true;
  }

  destroy() {
    callbacks.destroy.call(this.widget);
  }

  onSource() {
    callbacks.onSource.call(this.widget);
  }

  onSalesbotDesignerSave(handlerCode: any, params: any) {
    callbacks.onSalesbotDesignerSave.call(this.widget, handlerCode, params);
  }

  onAddAsSource(pipeline_id: any) {
    callbacks.onAddAsSource.call(this.widget, pipeline_id);
  }

  private leadsSelected() {
    callbacks.leadsSelected.call(this.widget);
  }

  private contactsSelected() {
    callbacks.contactsSelected.call(this.widget);
  }

  private todoSelected() {
    callbacks.todoSelected.call(this.widget);
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
