'use strict';
var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  appData : {},

  initializing : function () {
    this.pkg = require('../package.json');
  },

  prompting : function () {
    var done = this.async();

    this.log(yosay('Welcome to the simple ' + chalk.green.bold('MithrilJS Boilerplate') + ' generator!\n' +
              'Created by ' + chalk.white.bold('Momchil "Fristys" Georgiev ') + ' \n' +
              'Twitter / Github ' + chalk.cyan('@fristys ')
    ));

    var prompts = [{
      name : 'appName',
      message : 'How would you like to name your application ?',
      default : 'MithrilJS'
    },
    {
      name : 'routingStrategy',
      message : 'What routing strategy would you like for the app ? \n/search , hash, pathname/',
      default : 'hash'
    },
    {
      name : 'defaultRoute',
      message : 'What should be the default application route (home page route) ?',
      default : '/'
    },
    {
      type : 'confirm',
      name : 'includejQuery',
      message : 'Would you like me to include jQuery in the application ?',
      default : true
    }];

    this.prompt(prompts, function (props) {
      this.appData.appName = props.appName;
      this.appData.strategy = props.routingStrategy;
      this.appData.defaultPath = props.defaultRoute;
      this.appData.hasjQ = props.includejQuery;

      done();
    }.bind(this));
  },

  writing : {
    app : function () {
      var context = this.appData;

      this.copy('_gulpfile.js', 'gulpfile.js');

      this.template('_package.json', 'package.json', context);
      this.template('_index.html', 'index.html', context);

      var batch = [
          {
            name : '_dev',
            contents : []
          },
          {
            name : '_dev/app',
            contents : [
              'app.routes.js'
            ]
          },
          {
            name : '_dev/app/components',
            contents : []
          },
          {
            name : '_dev/app/models',
            contents : [
              'Global models go here.txt'
            ]
          },
          {
            name : '_dev/app/modules',
            contents : []
          },
          {
            name : '_dev/app/modules/test',
            contents : [
              'TestModule.js',
              'TestModuleController.js',
              'TestModuleView.js'
            ]
          },
          {
            name : '_dev/css',
            contents : [
              'style.css'
            ]
          },
          {
            name : '_dev/img',
            contents : []
          }
        ];

      for (var i = 0; i < batch.length; i++) {
        var directory = batch[i];

        this.mkdir(directory.name);

        if (directory.contents.length > 0) {
          for (var a = 0; a < directory.contents.length; a++) {
            var file = directory.contents[a],
                target = (directory.name + '/' + file);

            this.copy(target, target);
          }
        }
      }

      this.template('_dev/app/app.js', '_dev/app/app.js', context);

      this.mkdir('css');
      this.copy('_css/normalize.css', 'css/normalize.css');

      this.mkdir('js');
      this.copy('_js/mithril.min.js', 'js/mithril.min.js');
      this.copy('_js/mithril.min.js.map', 'js/mithril.min.js.map');

      this.mkdir('js/app');

      this.log(chalk.red('Directory and file generation completed!'));
    },

    projectfiles : function () {}
  },

  install : function () {
    this.installDependencies({
      skipInstall : this.options['skip-install']
    });
  }
});
