import { IWidget } from '../types/IWidget';
import { config } from '../config';

const { isDevMode, port } = config;

export const loadTemplate = function (
  this: IWidget,
  filename: string,
  data: { [key: string]: any },
  callback?: (html: string) => void
) {
  data = typeof data == 'object' ? data : {};

  // Дополнительные данные для правильного формирования пути до файлов стилей
  data.settings = this.get_settings();
  data.meta = { filename };

  // Для режима разработки: стили и шаблоны будут подтягиваться с локального сервера
  if (isDevMode) {
    data.settings.path = `http://localhost:${port}`;
    data.isDevMode = true;
  }

  return this.render({
    href: `/templates/${filename}/${filename}.twig`,
    base_path: this.params.path,
    load: (template) => {
      if (callback) {
        const html = template.render(data);
        callback(html);
      }
    },
  });
};
