'use strict';

angular.module('briefhackApp')
	.controller('SigninCtrl', function($scope, $http, $location) {
		$scope.login = function(form) {
			$scope.submitted = true;
			$location.path('/client');
		};
	});