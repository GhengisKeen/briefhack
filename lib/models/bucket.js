'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Bucket Schema
 */
var BucketSchema = new Schema({
  articles: [String]
});

mongoose.model('Bucket', BucketSchema);
