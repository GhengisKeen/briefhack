'use strict';

angular.module('briefhackApp')
	.controller('DesktopCtrl', function($scope, tabs, Bucket) {
		$scope.currentTab = {
			articles: []
		};

		// setInterval(function() {
		// 	console.log("blah");
		// 	Bucket.queryAll(function(data) {
		// 		$scope.menu = data;
		// 	});
		// }, 3000);

		// use only for live server.

		$scope.menu = tabs;

		// $scope.currentTab = (_.isUndefined(_.first(tabs))) ? {
		// 	articles: []
		// } : _.first(tabs);
		// console.log("first tab", _.first(tabs));
		// console.log("our current tab", $scope.currentTab);
		$scope.isActive = function(route) {
			return true;
			// return route === $location.path();
		};

		$scope.closeTab = function(id) {
			// console.log("Delete bucket is clicked" + $scope.menu[id]._id);
			Bucket.remove({
				id: $scope.menu[id]._id
			}, function(err) {
				console.log(err);
			});
			$scope.menu.splice(id, 1);
			$scope.changeTab(id % ($scope.menu.length));

		};
		$scope.changeTab = function(id) {
			Bucket.get({}, {
				"id": $scope.menu[id]._id
			}, function(data) {
				$scope.currentTab = data;
			});
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