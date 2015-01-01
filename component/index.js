'use strict';
var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing : function () {
    this.argument('name', {
      required : true,
      type : String,
      desc : 'The name of the new model'
    });
  },

  prompting : function () {
    var done = this.async();

    this.log(yosay('Welcome to the simple ' + chalk.green.bold('MithrilJS Boilerplate') + ' generator!\n' +
              'Created by ' + chalk.white.bold('Momchil "Fristys" Georgiev ') + ' \n' +
              'Twitter / Github ' + chalk.cyan('@fristys ')
    ));

    var prompts = [{
      name : 'attachTo',
      message : 'What element should this component be attached to ?',
      default : 'document.getElementsByTagName("body")[0]'
    }];

    this.prompt(prompts, function (props) {
      this.attachTo = props.attachTo;

      done();
    }.bind(this));
  },

  writing : function () {
    var context = {};
    context.name = this.name;
    context.attachTo = this.attachTo;

    this.template('SampleComponent.js', ('_dev/app/components/' + this.name + 'Component.js'), context);
  }
});
