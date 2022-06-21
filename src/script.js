define([], function () {
  var CustomWidget = function () {
    var self = this;

    this.callbacks = {
      render: function () {
        console.log("render");
        return true;
      },
      init: _.bind(function () {
        console.log("init");
        return true;
      }, this),
      bind_actions: function () {
        console.log("bind_actions");
        return true;
      },
      settings: function () {
        console.log("settings");
        return true;
      },
      onSave: function () {
        alert("onSave");
        return true;
      },
      destroy: function () {
        alert("onDestroy");
      },
      contacts: {
        selected: function () {
          console.log("contacts");
        },
      },
      leads: {
        selected: function () {
          console.log("leads");
        },
      },
      tasks: {
        selected: function () {
          console.log("tasks");
        },
      },
      advancedSettings: _.bind(function () {
        console.log("advancedSettings");
      }, self),
      onSalesbotDesignerSave: function (handler_code, params) {
        console.log(params);
      },
    };
    return this;
  };
  return CustomWidget;
});
