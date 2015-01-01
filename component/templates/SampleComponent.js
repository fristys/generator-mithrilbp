(function (m, app, $) {

  // <%= name %> component definition
  var <%= name %> = {
    controller : function () {
      this.test = m.prop('<%= name %>');
    },

    view : function (controller) {
      return m('', controller.test());
    }
  };

  // Declaration
  app.component('<%= name %>Component', <%= attachTo %>, <%= name %>);

})(m, app, jQuery);