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
      name : 'modelLocation',
      message : 'What module should this module be attached to (none = global model) ?',
      default : 'none'
    }];

    this.prompt(prompts, function (props) {
      this.isGlobal = (props.modelLocation === 'none' || props.modelLocation === '');
      this.modelLocation = props.modelLocation;

      done();
    }.bind(this));
  },

  writing : function () {
    var context = {};
    context.name = this.name;

    if (this.isGlobal)
      this.template('SampleModel.js', ('_dev/app/models/' + this.name + 'Model.js'), context);
    else
      this.template('SampleModel.js', ('_dev/app/modules/' + this.modelLocation + '/' + this.name + 'Model.js'), context);
  }
});
