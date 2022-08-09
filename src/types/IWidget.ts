type booleanCallback = () => boolean;
type voidCallback = () => void;

export interface IWidgetCallbacks {
  render: booleanCallback;
  init: booleanCallback;
  bind_actions: booleanCallback;
  settings?: voidCallback;
  dpSettings?: voidCallback;
  advancedSettings?: voidCallback;
  onSave?: booleanCallback;
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

type template = {
  render: (data: {}) => string;
};

export interface IWidget {
  callbacks: IWidgetCallbacks;
  params: {
    path: string;
    version: string;
    widget_code: string;
  };
  render: (
    options: {
      data?: string;
      href?: string;
      base_path?: string;
      v?: string;
      promised?: boolean;
      load?: (template: template) => void;
    },
    parameters?: {},
  ) => string | boolean | Promise<template>;
  /**
   * Метод оборачивает переданную ему разметку или шаблон в стандартную для виджетов оболочку (разметку)
   * и помещает полученную разметку в правую колонку виджетов.
   * Можно передавать данной функции html разметку или шаблон с данными для рендеринга, так же
   * как в случае с методом render().
   */
  render_template: (
    parameters: {
      caption: {
        class_name: string;
      };
      body: string; //
      render: {};
    },
    renderData?: {
      name: string;
    },
  ) => any;
  get_settings(): {};
}
