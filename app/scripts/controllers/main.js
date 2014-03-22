'use strict';

angular.module('briefhackApp')
	.controller('MainCtrl', function($scope, $http) {
		$scope.selected = [];
		$scope.btnAdd = function() {
			alert(0);
		};
		$scope.newsList = [{
			name: 'newsAAA',
			headline: 'newsAAA',
			excerpt: 'newsAAA',
			code: 'newsAAA',
			isActive: false
		}, {
			name: 'newsAAA',
			isActive: false
		}, {
			name: 'newsAAA',
			isActive: false
		}];

		$scope.isActive = false;
		$scope.highlightMe = function($index) {
			// $window.alert(1);
			console.log($index);
			$scope.selected.push($scope.newsList[$index]);
			$scope.newsList[$index].isActive = !$scope.newsList[$index].isActive;
		};
		$http.get('/api/awesomeThings').success(function(awesomeThings) {
			$scope.awesomeThings = awesomeThings;
		});
		// $scope.newsList = ['newsA', 'newsB', 'newsC'];
	});