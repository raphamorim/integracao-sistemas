/*
 * Routes index.
 */
var configAuth = {
	'facebookAuth': {
		'clientID': '594487354052992', // your App ID
		'clientSecret': '9028da0d10057701732f8f48459f17cf', // your App Secret
		'callbackURL': 'http://localhost:8080/auth/facebook/callback'
	}
};

var kenobi = require('kenobi'),
	Promises = require('bluebird'),
	url = require('url'),
	moment = require('moment'),
	fs = require('fs'),
	Product = Promises.promisifyAll(require('../models/product'));

exports.home = function(req, res) {
	if (req.user)
		return res.redirect('/list');

	kenobi({}, '/views/home.ejs', function(page) {
		res.end(page);
	});
};

exports.list = function(req, res) {
	if (!req.user)
		return res.redirect('/home');

	return Product.findAsync({}).then(function(obj) {
		kenobi({
			products: obj,
			user: req.user,
			request: false
		}, '/views/list.ejs', function(page) {
			res.end(page);
		})
	})
};