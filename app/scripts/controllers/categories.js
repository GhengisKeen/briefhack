'use strict';

angular.module('briefhackApp')
  .controller('CategoriesCtrl', function ($scope, $http) {
	
		$scope.catList = [];
			// console.log("Entry")
		$http.get('/api/Reuters/TopNewsCategories/' + encodeURIComponent(JSON.stringify({
			'$select': 'Code,Name'
		}))).
		success(function(data) {
			console.log("success: ", data);
			for (var i = 0; i < data.d.length; i++) {
				$scope.catList.push({
					name: data.d[i].Name,
					value: data.d[i].Code
				});
			}
			
		})
		.error(function(data){
			console.log("ERROR! " + data);
		});


		$scope.goToCategory = function() {
			console.log("Go to category " + $scope.currentCategory);
		};
  });
