import './home.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './home.routes';
import HomeController from './home.controller';
import randomNames from '../../services/randomNames.service';
import greeting from '../../directives/greeting.directive';
import charts from '../../directives/charts.directive';

export default angular.module('app.home', [uirouter, randomNames, greeting,charts])
  .config(routing)
  .controller('HomeController', HomeController)
  .name;
