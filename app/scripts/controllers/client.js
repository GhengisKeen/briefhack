'use strict';
/*global _:false */

angular.module('briefhackApp')
	.controller('ClientCtrl', function($scope, $http, Bucket) {

		// Get news item from hard-coded category
		$scope.newsList = [];

		$http.get('/api/Reuters/TopNews/' + encodeURIComponent(JSON.stringify({
			'$filter': "Request/Codes eq 'urn:newsml:reuters.com:20060725:SPDOC_304469252006'",
			'$select': 'headline,Brief,uniqueIdentifier,SmallImage,SmallImageUrl,ImageUrl,insertDateTime'
		}))).
		success(function(data) {
			function pad(num, size) {
				var s = num+"";
				while (s.length < size) {
					s = '0' + s;
				}
				return s;
			}
			for (var i = 0; i < data.d.length; i++) {
				var date = new Date(parseInt(data.d[i].insertDateTime.replace(/[^\d]/g,"")));
				console.log( date );
				$scope.newsList.push({
					headline: data.d[i].headline,
					excerpt: data.d[i].Brief,
					code: data.d[i].uniqueIdentifier,
					smallImage: data.d[i].SmallImage,
					smallImageUrl: data.d[i].SmallImageUrl,
					imageUrl: data.d[i].ImageUrl,
					insertDateTime: date,
					stringDate: pad(date.getDate(),2) + "/"  +  pad(date.getMonth(),2) + "/"  +  date.getFullYear() + " "   +  pad(date.getHours(),2) + ":"  +  pad(date.getMinutes(),2),
					isActive: false
				});
			}

		});

		$scope.highlightMe = function($index) {
			$scope.newsList[$index].isActive = !$scope.newsList[$index].isActive;
		};

		$scope.btnAdd = function() {
			// filter those that have isActive set to true. 
			var filtered = _.filter($scope.newsList, function(value, key, list) {
				// console.log(value.isActive);
				return value.isActive === true;
			});
			filtered = _.pluck(filtered, 'code');
			Bucket.save({}, {
				'articles': filtered
			}); // save to database

			// reset selection
			_.each($scope.newsList, function(item) {
				// console.log(item);
				item.isActive = false;
			});

		};
	});