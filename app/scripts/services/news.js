'use strict';

// .factory('News', function News($resource) {
angular.module('briefhackApp')
	.factory('News', function News() {
		return {
			get: function() {
				return [{
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
			}
		};
	});