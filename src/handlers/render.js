define([], function () {
  return function () {
    console.log('render');

    this.render_template({
      caption: {
        class_name: 'js-zoom-caption',
        html:
          '<image src="' +
          this.params.path +
          '/images/logo.png?v=' +
          this.get_version() +
          '"/>',
      },
      body:
        '<link type="text/css" rel="stylesheet" href="' +
        this.params.path +
        '/style.css?v=' +
        this.get_version() +
        '">',
      render:
        '<div class="zoom-form">' +
        '<div class="zoom-form-button create_meeting">' +
        'test555' +
        '</div>' +
        '<div class="zoom-copy-link zoom-text"></div>' +
        '<div class="zoom-copy-start-link zoom-text"></div>' +
        '<div class="zoom-copy-password zoom-text"></div>' +
        '</div>',
    });
  };
});
