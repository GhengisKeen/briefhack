'use strict';
/*global _:false */

angular.module('briefhackApp')
	.controller('ClientCtrl', function($scope, $http, News, $location) {
		$scope.go = function(params) {
			return (decodeURIComponent(params));
		};

		$scope.a = {'$test':"urn'test'", '$blah':'foo'};
		$scope.b = buildUrl($scope.a);
		console.log('b', $scope.b);
		$scope.newsList = [{
			name: 'newsAAA',
			headline: 'newsAAA',
			excerpt: 'newsAAA',
			code: 'newsAAA',
			isActive: false
		}, {
			name: 'newsAAA',
			headline: 'newsAAA',
			excerpt: 'newsAAA',
			code: 'newsAAA',
			isActive: false
		}, {
			name: 'newsAAA',
			headline: 'newsAAA',
			excerpt: 'newsAAA',
			code: 'newsAAA',
			isActive: false
		}];

		console.log(News.get());
		$http.get('/api/awesomeThings').success(function(awesomeThings) {
			$scope.awesomeThings = awesomeThings;
		});

		$scope.highlightMe = function($index) {
			$scope.newsList[$index].isActive = !$scope.newsList[$index].isActive;
		};

		$scope.btnAdd = function() {
			// filter those that have isActive set to true. 
			$scope.filtered = _.filter($scope.newsList, function(value, key, list) {
				// console.log(value.isActive);
				return value.isActive === true;
			});
			console.log($scope.filtered);
		};
	});