'use strict';

angular.module('briefhackApp')
	.controller('MainCtrl', function($scope, $http) {
		$scope.newsList = [{
				name: 'newsAAA',
				clickedClass: 'clickedClass'
			}, {
				name: 'newsAAA',
				clickedClass: 'clickedClass'
			}, {
				name: 'newsAAA',
				clickedClass: 'clickedClass'
			}];
/*		$scope.btnAdd = function() {
			// $window.alert(1);
			console.log('hihi');
			$scope.newsList = [{
				name: 'newsAAA',
				clickedClass: false
			}, {
				name: 'newsAAA',
				clickedClass: false
			}, {
				name: 'newsAAA',
				clickedClass: false
			}];
		}*/
		$scope.highlightMe = function($index) {
			// $window.alert(1);
			console.log($index);
			$scope.newsList[$index].clickedClass=true;
		}
		// $http.get('/api/awesomeThings').success(function(awesomeThings) {
		// 	$scope.awesomeThings = awesomeThings;
		// });
		// $scope.newsList = ['newsA', 'newsB', 'newsC'];
	});