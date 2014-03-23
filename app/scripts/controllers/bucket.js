'use strict';

angular.module('briefhackApp')
	.controller('BucketCtrl', function($scope, $stateParams, Bucket) {
		// $http.get('/api/awesomeThings').success(function(awesomeThings) {
		// 	$scope.awesomeThings = awesomeThings;
		// });
		$scope.params = $stateParams.id;
		$scope.buckets = [];
		$scope.singleBucket = {};

		$scope.createBucket = function() {
			console.log("i am clicked");
			Bucket.save({}, {
				"articles": ['a', 'b', 'c']
			});
		};
		$scope.queryBucket = function() {
			console.log("Query bucket is clicked");
			Bucket.queryAll(function(data) {
				console.log("a", data);
				$scope.buckets = data;
			});
		};
		$scope.getBucket = function(id) {
			console.log("Get bucket is clicked");
			Bucket.get({}, {
				"id": $scope.buckets[id]._id
			}, function(data) {
				$scope.singleBucket = data;
			});
		};
		$scope.deleteBucket = function(id) {
			// console.log("Delete bucket is clicked" + $scope.buckets[id]._id);
			Bucket.remove({
				id: $scope.buckets[id]._id
			}, function(err) {
				console.log(err);
			});
			$scope.buckets.splice(id, 1);
		};
	});