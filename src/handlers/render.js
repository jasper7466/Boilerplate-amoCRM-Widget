define(['jquery', 'lib/components/base/modal'], function ($, Modal) {
  return function () {
    console.log('render');

    var data = '<h1>Test</h1><p>Some text</p>';
    modal = new Modal({
      class_name: 'modal-window',
      init: function ($modal_body) {
        var $this = $(this);
        $modal_body
          .trigger('modal:loaded') // запускает отображение модального окна
          .html(data)
          .trigger('modal:centrify') // настраивает модальное окно
          .append('');
      },
      destroy: function () {},
    });

    // console.log(this.system());
    // console.log(this.get_settings());
    // console.log(this.params);
    console.log(this.render_template);

    const path = this.params.path;
    const version = this.params.version;
    const UID = this.params.widget_code;

    this.render_template({
      caption: {
        class_name: '',
        html: '',
      },
      body: `<button>body button</button>`,
      render: `<h2>header render</h2>`,
    });

    // this.render_template({
    //   caption: {
    //     class_name: 'js-zoom-caption',
    //     html: `<image src="${path}/images/logo.png?v=${version}"/>`,
    //   },
    //   body: `<link type="text/css" rel="stylesheet" href="${path}/style.css?v=${version}">`,
    //   render: `
    //   <div class="zoom-form">
    //     <div class="zoom-form-button create_meeting">
    //     test555
    //     </div>
    //     <div class="zoom-copy-link zoom-text"></div>
    //     <div class="zoom-copy-start-link zoom-text"></div>
    //     <div class="zoom-copy-password zoom-text"></div>
    //     </div>
    //     `,
    // });
  };
});
