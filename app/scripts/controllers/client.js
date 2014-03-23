'use strict';
/*global _:false */

angular.module('briefhackApp')
	.controller('ClientCtrl', function($scope, $http) {

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