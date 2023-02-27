# Boilerplate-amoCRM-Widget

## Назначение

Шаблонный репозиторий для разработки amoCRM-виджета на TypeScript c динамической рекомпиляцией и локальной подгрузкой в систему.

Выполнен в виде виджета-обёртки для запуска основного SPA-виджета в iframe, но может быть использован и для полностью нативного amo-виджета.

## Как пользоваться

<details>
    <summary>Развёртывание</summary>
    
- Склонировать репозиторий:

        git clone https://github.com/jasper7466/Boilerplate-amoCRM-Widget.git

- Установить зависимости:

        npm install

</details>

<details>
    <summary>Режим разработки</summary>

- Выполнить сборку виджета-загрузчика:

        npm run build-loader

По завершении работы скрипта в директории `./dist` будет сформирован архив `widget.zip`.

Виджет загрузчик отличается от обычного лишь модифицированным файлом `script.js`, содержимое которого заменяется на конструкцию вида:

```javascript
define([
  'http://localhost:${config.port}/script.js',
  'jquery',
  'lib/components.base/modal',
], function (widget, $, Modal) {
  return widget;
});
```

Это позволяет выполнять загрузку исходного кода с локального сервера без необходимости подготовки zip-архива и его загрузки через веб-интерфейс после каждого изменения.

- Загрузить виджет-загрузчик как приватную интеграцию через интерфейс amo-маркета
- Запустить сборку и локальный хостинг проекта командой:

        npm run start

При этом проект будет автоматически пересобираться при детектировании изменений в \*.ts-файлах и файлах статики ( \*.css, \*.twig).

Для применения изменений после очередной пересборки - достаточно лишь обновить вкладку amoCRM в браузере.

</details>

## Известные проблемы и что можно улучшить

- Реализовать полное покрытие amo-объектов типами. На данный момент типизация выполнена в рамках решаемой задачи и актуальна на дату публикации проекта
- Есть проблемы с авто-подстановкой расширений '.js' для импортов. Неплохо было бы задействовать модульный сборщик (webpack или аналог) вместо самописных скриптов.
- Единообразный стиль нейминга файлов (перейти на kebab-case).
