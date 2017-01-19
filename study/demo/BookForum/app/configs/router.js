'use strict';

angular.module('com.ngnice.app').config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('default', {
    url: '',
    templateUrl: 'controllers/home/index.html',
    controller: 'HomeIndexController as vm'
  });
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'controllers/home/index.html',
    controller: 'HomeIndexController as vm'
  });

  $stateProvider.state('notFound', {
    url: '/notFound',
    templateUrl: 'controllers/home/notFound.html',
    controller: 'HomeNotFoundController as vm'
  });
  $urlRouterProvider.otherwise('/notFound');

  $stateProvider.state('reader', {
    url: '/reader',
    template: '<div ui-view></div>',
    abstract: true
  });
  $stateProvider.state('reader.create', {
    url: '/create',
    templateUrl: 'controllers/reader/create.html',
    controller: 'ReaderCreateController as vm'
  });
});
