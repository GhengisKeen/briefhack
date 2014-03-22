'use strict';

angular.module('briefhackApp')
	.controller('MainCtrl', function($scope, $http) {
		$scope.selected = [];

		
		$scope.btnAdd = function() {
			alert(0);
		};
		$scope.isActive = false;

		// Authenticate
		$http.get('https://amers1.mobile13.cp.reutest.com/msf1.0/data/UserInfo');

		// Get news item from hard-coded category
		$scope.newsList = [];
		$http.get('https://amers1.mobile13.cp.reutest.com/msf1.0/data/TopNews', {
			params: {
				"$filter":"Request/Codes eq 'urn:newsml:reuters.com:20060725:SPDOC_304469252006'",
				"$select":"headline,ImageUrl,SmallImageUrl,Brief,uniqueIdentifier"
			}
		}).
	    success(function(data, status, headers, config) {
	    	for (var index = 0; index < data.d.length; index++) {
			    console.log(data.d[index]);
			}
	    	for (var i = 0; i < data.d.length; i++) {
				$scope.newsList.push(
	    			{
	    				name: data.d[i].headline,
	    				headline: data.d[i].headline,
	    				excerpt: data.d[i].Brief,
	    				code: data.d[i].uniqueIdentifier,
	    				isActive:false
	    			}
	    		);
	    	}
	    }).
	    error(function(data, status, headers, config) {
	    	debugger;
	    });

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
			$scope.selected.push($scope.newsList[$index]);
			$scope.newsList[$index].isActive = !$scope.newsList[$index].isActive;
		};
		$http.get('/api/awesomeThings').success(function(awesomeThings) {
			$scope.awesomeThings = awesomeThings;
		});
		// $scope.newsList = ['newsA', 'newsB', 'newsC'];
	});