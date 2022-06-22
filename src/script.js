define(['./handlers/handlers.js'], function (handlers) {
  var CustomWidget = function () {
    var widget = this;

    this.callbacks = {
      render: function () {
        handlers.render.call(widget);
        return true;
      },
      init: function () {
        handlers.init.call(widget);
        return true;
      },
      bind_actions: function () {
        handlers.bindActions.call(widget);
        return true;
      },
      settings: function () {
        handlers.settings.call(widget);
      },
      dpSettings: function () {
        handlers.dpSettings.call(widget);
      },
      advancedSettings: function () {
        handlers.advancedSettings.call(widget);
      },
      onSave: function () {
        handlers.onSave.call(widget);
        return true;
      },
      leads: {
        selected: function () {
          handlers.leadsSelected.call(widget);
        },
      },
      contacts: {
        selected: function () {
          handlers.contactsSelected.call(widget);
        },
      },
      todo: {
        selected: function () {
          handlers.todoSelected.call(widget);
        },
      },
      destroy: function () {
        handlers.destroy.call(widget);
      },
      onSource: function () {
        handlers.onSource.call(widget);
      },
      onSalesbotDesignerSave: function (handler_code, params) {
        handlers.onSalesbotDesignerSave.call(widget, handler_code, params);
      },
      onAddAsSource: function (pipeline_id) {
        handlers.onAddAsSource.call(widget, pipeline_id);
      },
    };
    return this;
  };
  return CustomWidget;
});
