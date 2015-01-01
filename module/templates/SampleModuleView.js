(function (m, app) {

  // View
  app.module('<%= name %>Module').view = function (controller) {
    return m('h2', controller.test());
  };

})(m, app);