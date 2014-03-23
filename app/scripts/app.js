'use strict';

angular.module('briefhackApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .state('client', {
        url: '/client',
        templateUrl: 'partials/client',
        controller: 'ClientCtrl'
      })
      .state('desktop', {
        url: '/desktop',
        templateUrl: 'partials/desktop',
        controller: 'DesktopCtrl'
      })
      .state('bucket', {
        url: '/bucket/:id',
        templateUrl: 'partials/bucket',
        controller: 'BucketCtrl'
      })
      .state('graph', {
        url: '/graph',
        templateUrl: 'partials/graph',
        controller: 'GraphCtrl'
      });

    $locationProvider.html5Mode(true);
  });