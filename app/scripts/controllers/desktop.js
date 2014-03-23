'use strict';

angular.module('briefhackApp')
	.controller('DesktopCtrl', function($scope, tabs, Bucket) {

		console.log($scope.tabs, tabs);

		// setInterval(function() {
		// 	console.log("blah");
		// 	Bucket.queryAll(function(data) {
		// 		$scope.menu = data;
		// 	});
		// }, 3000);

		// use only for live server.

		$scope.menu = tabs;
		$scope.isActive = function(route) {
			return true;
			// return route === $location.path();
		};

		$scope.addAnother = function() {
			console.log('test');
			$scope.menu.push({
				'title': 'Home',
				'link': '/'
			});
			console.log($scope.menu);
		};

		$scope.foo = function(taskId) {
			alert('Task Id is ' + taskId);
		};
		console.log($scope);
	});