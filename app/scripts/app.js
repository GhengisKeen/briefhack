'use strict';

angular.module('briefhackApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/client/', {
        templateUrl: 'partials/client',
        controller: 'ClientCtrl'
      })
      .when('/desktop/', {
        templateUrl: 'partials/desktop',
        controller: 'DesktopCtrl'
      })
      .when('/bucket/:id', {
        templateUrl: 'partials/desktop',
        controller: 'DesktopCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });