import { PageCode } from './AMOCRM';

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

type location =
  | 'lcard'
  | 'cucard'
  | 'ccard'
  | 'comcard'
  | 'llist'
  | 'culist'
  | 'clist'
  | 'tlist'
  | 'tline'
  | 'tcalendar'
  | 'settings'
  | 'advanced_settings'
  | 'card_sdk'
  | 'catalogs'
  | 'digital_pipeline'
  | 'lead_sources'
  | 'whatsapp_modal';

export interface IWidgetSettings {
  active: 'S' | 'N' | 'Y';
  category_code?: 'own_integrations' | '';
  id: number;
  images_path: string;
  oauth_client_uuid: string;
  path: string;
  status: 'not_configured' | 'installed';
  support: any[];
  version: string;
  widget_active: 'N' | 'Y';
  widget_code: string;
}

export interface ISystem {
  amohash: string;
  amouser: string;
  amouser_id: number;
  area: location;
  displayed_count: number;
  displayed_count_by_area: { [key in PageCode]: number };
  domain: string;
  server: string;
  subdomain: string;
}

export interface IWidget {
  callbacks: IWidgetCallbacks;
  params: IWidgetSettings;
  render: (
    options: {
      data?: string;
      href?: string;
      base_path?: string;
      v?: string;
      promised?: boolean;
      load?: (template: template) => void;
    },
    parameters?: {}
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
    }
  ) => any;
  get_settings(): IWidgetSettings;
  system(): ISystem;
}
