#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"
// http://unix.stackexchange.com/questions/65235/universal-node-js-shebang

var mongoose = require('mongoose'),
   env = require('../config/environment'),
   Promises = require('bluebird'),
   companies = require('./companies.json')['companies'];
   Company = Promises.promisifyAll(require('../models/company'));

mongoose.connect(env.config.mongo);

return Company.removeAsync({}).then(function(err) {
   console.log('[populate] companies removed!')

   return Promises.map(companies, function(company) {
      Company.createAsync(company)
   })
   .then(function(result) {
      console.log('[populate] companies created!');
   })
})