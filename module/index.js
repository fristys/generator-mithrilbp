'use strict';
var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing : function () {
    this.argument('name', {
      required : true,
      type : String,
      desc : 'The name of the new module'
    });
  },

  prompting : function () {
    var done = this.async();

    this.log(yosay('Welcome to the simple ' + chalk.green.bold('MithrilJS Boilerplate') + ' generator!\n' +
              'Created by ' + chalk.white.bold('Momchil "Fristys" Georgiev ') + ' \n' +
              'Twitter / Github ' + chalk.cyan('@fristys ')
    ));

    var prompts = [{
      name : 'moduleRoute',
      message : 'What should be the route pointing to this module ?',
      default : '/'
    }];

    this.prompt(prompts, function (props) {
      this.route = props.moduleRoute;
      done();
    }.bind(this));
  },

  writing : function () {
    var context = {};

    context.name = this.name;
    context.route = this.route;

    var targetDIR = ('_dev/app/modules/' + context.name);

    this.mkdir(targetDIR);

    this.template('SampleModule.js', (targetDIR + '/' + context.name + 'Module.js'), context);
    this.template('SampleModuleController.js', (targetDIR + '/' + context.name + 'ModuleController.js'), context);
    this.template('SampleModuleView.js', (targetDIR + '/' + context.name + 'ModuleView.js'), context);
  }
});
