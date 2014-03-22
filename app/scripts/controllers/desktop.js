'use strict';

angular.module('briefhackApp')
	.controller('DesktopCtrl', function($scope) {

		$scope.menu = [{
			'title': 'Home',
			'link': '/'
		}];

		$scope.isActive = function(route) {
			return true;
			// return route === $location.path();
		};

		$scope.addAnother = function() {
			console.log('test');
			$scope.menu.push({
				'title': 'Home',
				'link': '/'
			})
			console.log($scope.menu);
		};

		$scope.foo = function(taskId) {
			alert("Task Id is " + taskId);
		};
		console.log($scope);
	});