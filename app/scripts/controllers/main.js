'use strict';

angular.module('briefhackApp')
	.controller('MainCtrl', function($scope, $http, $location) {
		$location.path('/signin');
		$scope.selected = [];


		$scope.btnAdd = function() {
			alert(0);
		};
		$scope.isActive = false;

		// Get news item from hard-coded category
		$scope.newsList = [];

		$http.get('/api/Reuters/TopNews/' + encodeURIComponent(JSON.stringify({
			'$filter': "Request/Codes eq 'urn:newsml:reuters.com:20060725:SPDOC_304469252006'",
			'$select': 'headline,ImageUrl,SmallImageUrl,Brief,uniqueIdentifier'
		}))).
		success(function(data) {
			for (var index = 0; index < data.d.length; index++) {
				console.log(data.d[index]);
			}
			for (var i = 0; i < data.d.length; i++) {
				$scope.newsList.push({
					name: data.d[i].headline,
					headline: data.d[i].headline,
					excerpt: data.d[i].Brief,
					code: data.d[i].uniqueIdentifier,
					isActive: false
				});
			}
		}).
		error(function(data, status, headers, config) {
			// debugger;
		});

		$scope.isActive = false;

		$scope.highlightMe = function($index) {
			// $window.alert(1);
			console.log($index);
			$scope.selected.push($scope.newsList[$index]);
			$scope.newsList[$index].isActive = !$scope.newsList[$index].isActive;
		};
	});
