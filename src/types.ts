type booleanCallback = () => boolean;
type voidCallback = () => void;

export interface IWidgetCallbacks {
  render: booleanCallback;
  init: booleanCallback;
  bind_actions: booleanCallback;
  settings?: voidCallback;
  dpSettings?: voidCallback;
  advancedSettings?: voidCallback;
  onSave?: voidCallback;
  leads?: {
    selected: voidCallback;
  };
  contacts?: {
    selected: voidCallback;
  };
  todo?: {
    selected: voidCallback;
  };
  destroy?: voidCallback;
  onSource?: voidCallback;
  onSalesbotDesignerSave?: (handlerCode: any, params: any) => void;
  onAddAsSource?: (pipeline_id: number) => void;
}

export interface IWidget {
  callbacks: IWidgetCallbacks;
}
