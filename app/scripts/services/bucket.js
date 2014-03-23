'use strict';

angular.module('briefhackApp')
  .factory('Bucket', function($resource) {
    var r = $resource('/api/bucket/:userId', {
      userId: '@id'
    }, {
      queryAll: {
        method: 'GET',
        url: '/api/allbucket',
        isArray: true
      }
    });

    // console.info(r);
    return r;
  });