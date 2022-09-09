import * as $ from 'jquery';
import * as Backbone from 'backbone';

type entity = 'leads' | 'customers';

export type PageCode =
  | 'dashboard'
  | 'leads'
  | 'leads-trash'
  | 'leads-pipeline'
  | 'customers'
  | 'contacts'
  | 'customers-pipeline'
  | 'customers-trash'
  | 'contacts-trash'
  | 'companies'
  | 'mail'
  | 'todo'
  | 'todo-trash'
  | 'todo-line'
  | 'todo-calendar'
  | 'events'
  | 'authlog'
  | 'stats'
  | 'stats-human'
  | 'statsCalls'
  | `widget-page:${string}`
  | 'settings'
  | `advanced-settings:${number}`
  | 'widgetsSettings'
  | 'settings-users'
  | 'settings-communications'
  | 'catalogs'
  | 'leads_card'
  | 'contacts_card'
  | 'companies_card'
  | 'customers_card';

export type constants = {
  user: {};
  user_rights: {
    is_admin: boolean;
    is_free_user: boolean;
  };
  account: {};
  managers: {};
  groups: {};
  task_types: {};
};

type listItem = {
  id: number;
  name: string;
  checked: boolean;
};

type card = {
  /**
   * Идентификатор текущей карточки. Равен 0 для новой карточки.
   */
  id: number;
  /**
   * Backbone-модель для доступа к заполненным данным в карточке, хранит актуальные данные на момент ввода.
   * Т.е. если пользователь изменил значение поля, но еще не сохранил его - там будет значение, которое ввел пользователь.
   */
  model: Backbone.Model;
};

type userStatus = {
  id: string;
  online: boolean;
};

/**
 * Глобальный объект AMOCRM, через который можно получить некоторые данные в зависимости от интерфейса,
 * в котором находится пользователь.
 *
 */
export interface IAMOCRM {
  /**
   * Метод вернет строку с указанием сущности, в которой мы сейчас находимся
   * (например, leads для сделок или customers для покупателей и тд)
   */
  getBaseEntity(): entity;
  /**
   * Метод вернет булевое значение (true/false), находимся ли мы в данный момент в карточке.
   */
  isCard(): boolean;
  /**
   * Метод вернет код текущей страницы.
   */
  getWidgetsArea(): PageCode;
  /**
   * Метод вернет значение константы, переданной в key (если значение value не было передано)
   * или установит в значение константы value.
   * Обратите внимание, требования к публичным интеграциям запрещают переназначать системные константы.
   * @param key наименование константы
   * @param value новое значение константы
   */
  constant<K extends keyof constants>(
    key: K,
    value?: constants[K],
  ): constants[K];

  data: {
    /**
     * Хранит корневой DOM-элемент текущего интерфейса, в котором находится пользователь
     */
    current_view: { $el: typeof $ };
    /**
     * Коллекция текущих элементов списка с данными из выведенных колонок.
     * (если пользователь находится в любом интерфейсе списков: сделки, контакты/компании, покупатели, задачи).
     */
    current_list: listItem[];
    current_card: card | false;
  };

  sdk: {
    /**
     * Останавливает механизм обновления страницы при выкатке обновлений, чтобы не прервать звонок.
     * @param status статус звонка
     */
    setCallingStatus(status: boolean): void;
    /**
     * Проверка, находится ли пользователь какого-либо аккаунта онлайн.
     * Возвращает коллекцию всех пользователей, коллекцию только тех, кто онлайн или статус конкретного пользователя.
     * @param option
     */
    showUserStatus(
      option: 'online' | number,
    ): { [id: string]: userStatus } | boolean;
  };
}
