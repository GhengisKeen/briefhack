'use strict';
//require('longjohn');
var mongoose = require('mongoose'),
	Thing = mongoose.model('Thing'),
	Bucket = mongoose.model('Bucket');
// var http = require("http");
var https = require("https");
var url = require("url");

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
	console.log("Awesomething is called");
	return Thing.find(function(err, things) {
		if (!err) {
			return res.json(things);
		} else {
			return res.send(err);
		}
	});
};


/**
http://localhost:9000/api/Reuters/TopNews/%24filter=Request%2FCodes%20eq%20'urn%3Anewsml%3Areuters.com%3A20060725%3ASPDOC_304469252006'
 * Checking basic authentication
 */
exports.awesomeThings1 = function(req, res1) {
	console.log("Checking basic authentication ");
	var options = {
		host: 'amers1.mobile13.cp.reutest.com',
		path: '/msf1.0/data/TopNews/',
		method: 'GET',
		headers: {
			'Authorization': 'Basic ZWlrb25oYWNrMUB0aG9tc29ucmV1dGVycy5jb206UGFzc3dvcmQx',
		}
	};

	https.get(options, function(res) {
		// console.log('STATUS: ' + res.statusCode);
		// console.log('HEADERS: ' + JSON.stringify(res.headers));
		// Buffer the body entirely for processing as a whole.
		var bodyChunks = [];
		res.on('data', function(chunk) {
			// You can process streamed parts here...
			bodyChunks.push(chunk);
		}).on('end', function() {
			var body = Buffer.concat(bodyChunks);
			// console.log('BODY: ' + body);
			// ...and/or process the entire body here.
		}).on('error', function(err) {
			console.log(err);
		});
		res1.send({
			// request: JSON.stringify(options),
			status: res.statusCode,
			headers: JSON.stringify(res.headers)
		});
		console.log(options);
	});
};

/**
 * Fixed API call to reuters
 */
exports.TopNewsCategories = function(req, res1) {
	console.log("TopNewsCategories is called");
	var options = {
		host: 'amers1.mobile13.cp.reutest.com',
		// port: 443,
		path: "/msf1.0/data/TopNews/%24filter=Request%2FCodes%20eq%20'urn%3Anewsml%3Areuters.com%3A20060725%3ASPDOC_304469252006'",
		method: 'GET',
		headers: {
			'Authorization': 'Basic ZWlrb25oYWNrMUB0aG9tc29ucmV1dGVycy5jb206UGFzc3dvcmQx',
			'Accept': 'application/json'
		}
	};

	https.get(options, function(res) {
		var bodyChunks = [];
		res.on('data', function(chunk) {
			bodyChunks.push(chunk);
		}).on('end', function() {
			var body = Buffer.concat(bodyChunks);
			res1.send({
				status: res.statusCode,
				headers: res.headers,
				body1: body.toString()
			});
		}).on('error', function(err) {
			console.log(err);
		});
	});
};

exports.Reuters = function(req, res1) {
	console.log("Reuters is called");
	var params = JSON.parse(req.params.paramString);
	var paramStringCompoments = [];
	for (var p in params) {
		if (params.hasOwnProperty(p)) {
			paramStringCompoments.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
		}
	}
	var paramString = paramStringCompoments.join('&');

	// var a = url.format({
	// 	pathname:
	// });
	// var a = url.parse("/msf1.0/data/TopNewsCategories?page=25&foo=bar", true);
	// console.log(a);
	var options = {
		host: 'amers1.mobile13.cp.reutest.com',
		// port: 443,
		path: '/msf1.0/data/' + req.params.api + '?' + paramString,
		// path: '/msf1.0/data/TopNewsCategories',
		method: 'GET',
		headers: {
			'Authorization': 'Basic ZWlrb25oYWNrMUB0aG9tc29ucmV1dGVycy5jb206UGFzc3dvcmQx',
			'Accept': 'application/json'
			// 'authorization': "btoa(eikonhack1@thomsonreuters.com:Password1)"
			// 'Authorize': "btoa(eikonhack1@thomsonreuters.com:Password1)"
		}
	};


	console.log("gonna get stuff", options.path);

	https.get(options, function(res) {
		var bodyChunks = [];
		res.on('data', function(chunk) {
			bodyChunks.push(chunk);
		}).on('end', function() {
			var body = Buffer.concat(bodyChunks);
			res1.send(body.toString('utf-8'));
		}).on('error', function(err) {
			console.log(err);
		});
	});
};


/**
 * Delete Bucket
 */
exports.deleteBucket = function(req, res) {
	var BucketId = req.query.id;
	// console.log("bucketID is ", req.query.id);
	Bucket.findByIdAndRemove(BucketId, function(err, result) {
		console.log(err, result);
		res.send((result !== null) ? {
			msg: 'Successfully deleted entry'
		} : {
			msg: 'error: ' + err
		});
	});
};

/**
 * Get Bucket
 */
exports.getBucket = function(req, res) {
	var BucketId = req.params.id;
	console.log(BucketId);
	return Bucket.findById(BucketId, function(err, things) {
		if (!err) {
			return res.json(things);
		} else {
			return res.send({
				error: 1,
				msg: 'not found'
			});
		}
	});
};

/**
 * Get All Bucket
 */
exports.getAllBucket = function(req, res) {
	console.log('hahaha');
	return Bucket.find(function(err, things) {
		if (!err) {
			return res.json(things);
		} else {
			return res.send({
				error: 1,
				msg: 'not found'
			});
		}
	});
};

/**
 * Create Bucket
 */
exports.createBucket = function(req, res) {
	var newBucket = new Bucket(req.body);
	console.log("creating bucking", req.body);
	newBucket.save(function(err) {
		if (!err) {
			return res.json({
				error: 0,
				msg: 'succeeded'
			});
		} else {
			return res.json(400, err);
		}
	});
};