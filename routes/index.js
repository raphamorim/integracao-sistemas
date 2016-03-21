/*
 * Routes index.
 */
var kenobi = require('kenobi'),
	Promises = require('bluebird'),
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