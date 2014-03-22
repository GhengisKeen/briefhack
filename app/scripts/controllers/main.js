'use strict';

angular.module('briefhackApp')
	.controller('MainCtrl', function($scope, $http) {
		$scope.selected = [];
		$scope.newsList = [{
				name: 'newsAAA',
				isActive: false
			}, {
				name: 'newsAAA',
				isActive: false
			}, {
				name: 'newsAAA',
				isActive: false
			}];

			    $scope.isActive = false;
/*		$scope.btnAdd = function() {
			// $window.alert(1);
			console.log('hihi');
			$scope.newsList = [{
				name: 'newsAAA',
				isActive: false
			}, {
				name: 'newsAAA',
				isActive: false
			}, {
				name: 'newsAAA',
				isActive: false
			}];
		}*/
		$scope.highlightMe = function($index) {
			// $window.alert(1);
			console.log($index);
			$scope.newsList[$index].isActive=!$scope.newsList[$index].isActive;
		}
		// $http.get('/api/awesomeThings').success(function(awesomeThings) {
		// 	$scope.awesomeThings = awesomeThings;
		// });
		// $scope.newsList = ['newsA', 'newsB', 'newsC'];
	});