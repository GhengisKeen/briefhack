'use strict';
/*global _:false */

angular.module('briefhackApp')
	.controller('ClientCtrl', function($scope, $http, Bucket, News) {

		// Get news item from hard-coded category
		// $scope.newsList = [];

		$scope.catList = [];
		// console.log("Entry")
		// $http.get('/api/Reuters/TopNewsCategories/' + encodeURIComponent(JSON.stringify({
		// 	'$select': 'Code,Name'
		// }))).
		// success(function(data) {
		// 	for (var i = 0; i < data.d.length; i++) {
		// 		$scope.catList.push({
		// 			name: data.d[i].Name,
		// 			value: data.d[i].Code
		// 		});
		// 	}
		// 	console.log("success: ", JSON.stringify($scope.catList));

		// })

		$scope.catList = News.getCategories();
		$scope.newsList = News.get();
		$scope.isLoading = false;
		var catid = _.isEmpty($scope.catid) ? 'urn:newsml:reuters.com:20060725:SPDOC_304469252006' : $scope.catid;
		console.log("catid ", catid);
		$scope.goToCategory = function() {
		console.log("catid ", $scope.catid);
			$scope.isLoading = true;
			$http.get('/api/Reuters/TopNews/' + encodeURIComponent(JSON.stringify({
				'$filter': "Request/Codes eq '" + $scope.catid + "'",
				'$select': 'headline,Brief,uniqueIdentifier,SmallImage,SmallImageUrl,ImageUrl,insertDateTime'
			}))).
			success(function(data) {
				$scope.isLoading = false;
				$scope.newsList = [];

				function pad(num, size) {
					var s = num + "";
					while (s.length < size) {
						s = '0' + s;
					}
					return s;
				}
				for (var i = 0; i < data.d.length; i++) {
					var date = new Date(parseInt(data.d[i].insertDateTime.replace(/[^\d]/g, "")));
					console.log(date);
					$scope.newsList.push({
						headline: data.d[i].headline,
						excerpt: data.d[i].Brief,
						code: data.d[i].uniqueIdentifier,
						smallImage: data.d[i].SmallImage,
						smallImageUrl: data.d[i].SmallImageUrl,
						imageUrl: data.d[i].ImageUrl,
						insertDateTime: date,
						stringDate: pad(date.getDate(), 2) + "/" + pad(date.getMonth(), 2) + "/" + date.getFullYear() + " " + pad(date.getHours(), 2) + ":" + pad(date.getMinutes(), 2),
						isActive: false
					});
				}

			});
		};


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

		$scope.saveBtn = function() {
			console.log(JSON.stringify($scope.newsList));
		};
	});