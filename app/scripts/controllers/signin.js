'use strict';

angular.module('briefhackApp')
	.controller('SigninCtrl', function($scope, $http, $location) {
		$scope.login = function() {
			$location.path('/desktop');
		};
	});