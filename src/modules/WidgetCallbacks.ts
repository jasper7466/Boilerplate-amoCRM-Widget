import { callbacks } from './../callbacks/index';
import { IWidgetCallbacks } from '../types/IWidget';
import { IWidgetExtended } from '../interfaces/widget-extended.interface';

export class WidgetCallbacks implements IWidgetCallbacks {
  private widget: IWidgetExtended;

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

  public settings = () => callbacks.settings.call(this.widget);
  public dpSettings = () => callbacks.dpSettings.call(this.widget);
  public advancedSettings = () => callbacks.advancedSettings.call(this.widget);
  public destroy = () => callbacks.destroy.call(this.widget);
  public onSource = () => callbacks.onSource.call(this.widget);
  public onSalesbotDesignerSave = (handlerCode: any, params: any) =>
    callbacks.onSalesbotDesignerSave.call(this.widget, handlerCode, params);
  public onAddAsSource = (pipelineId: number) =>
    callbacks.onAddAsSource.call(this.widget, pipelineId);

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
