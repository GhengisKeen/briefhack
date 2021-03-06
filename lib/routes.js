'use strict';

var api = require('./controllers/api'),
    index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);
  app.get('/api/awesomeThings1', api.awesomeThings1);
  app.get('/api/TopNewsCategories', api.TopNewsCategories);
  app.get('/api/Reuters/:api/:paramString(*)', api.Reuters);
  
  //Bucket API routes
  app.get('/api/allbucket', api.getAllBucket);
  app.post('/api/bucket', api.createBucket);
  app.get('/api/bucket/:id', api.getBucket);
  app.del('/api/bucket', api.deleteBucket);


  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);

};