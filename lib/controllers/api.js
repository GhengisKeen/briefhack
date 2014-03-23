'use strict';
require('longjohn');
var mongoose = require('mongoose'),
	Thing = mongoose.model('Thing');
var http = require("http");
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
 * Get awesome things
 */
exports.awesomeThings1 = function(req, res1) {
	console.log("Awesomething1 is called");
	var options = {
		host: 'amers1.mobile13.cp.reutest.com',
		// port: 443,
		path: '/msf1.0/data/UserInfo',
		method: 'GET',
		headers: {
			'Authorization': 'Basic ZWlrb25oYWNrMUB0aG9tc29ucmV1dGVycy5jb206UGFzc3dvcmQx'
			// 'authorization': "btoa(eikonhack1@thomsonreuters.com:Password1)"
			// 'Authorize': "btoa(eikonhack1@thomsonreuters.com:Password1)"
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
 * Get awesome things
 */
exports.TopNewsCategories = function(req, res1) {
	console.log("TopNewsCategories is called");
	var options = {
		host: 'amers1.mobile13.cp.reutest.com',
		// port: 443,
		path: '/msf1.0/data/TopNewsCategories',
		method: 'GET',
		headers: {
			'Authorization': 'Basic ZWlrb25oYWNrMUB0aG9tc29ucmV1dGVycy5jb206UGFzc3dvcmQx',
			'Accept': 'application/json'
			// 'authorization': "btoa(eikonhack1@thomsonreuters.com:Password1)"
			// 'Authorize': "btoa(eikonhack1@thomsonreuters.com:Password1)"
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
	var paramStringCompoments  = [];
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
		path:  '/msf1.0/data/' + req.params.api + '?' + paramString,
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
			res1.send( body.toString('utf-8') );
		}).on('error', function(err) {
			console.log(err);
		});
	}); 
};