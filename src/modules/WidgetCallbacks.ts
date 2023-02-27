import { callbacks } from './../callbacks/index';
import { IWidgetCallbacks } from '../types/IWidget';
import { IWidgetExtended } from '../interfaces/widget-extended.interface';

export class WidgetCallbacks implements IWidgetCallbacks {
  widget: IWidgetExtended;

  constructor(widget: IWidgetExtended) {
    this.widget = widget;
  }

  public render() {
    callbacks.render.call(this.widget);
    return true;
  }

  public init() {
    callbacks.init.call(this.widget);
    return true;
  }

  public bind_actions() {
    callbacks.bindActions.call(this.widget);
    return true;
  }

  public onSave() {
    callbacks.onSave.call(this.widget);
    return true;
  }

  public settings = callbacks.settings;
  public dpSettings = callbacks.dpSettings;
  public advancedSettings = callbacks.advancedSettings;
  public destroy = callbacks.destroy;
  public onSource = callbacks.onSource;
  public onSalesbotDesignerSave = callbacks.onSalesbotDesignerSave;
  public onAddAsSource = callbacks.onAddAsSource;

  leads = {
    selected: callbacks.leadsSelected,
  };

  contacts = {
    selected: callbacks.contactsSelected,
  };

  todo = {
    selected: callbacks.todoSelected,
  };
}
