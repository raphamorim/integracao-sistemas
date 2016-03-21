#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"
// http://unix.stackexchange.com/questions/65235/universal-node-js-shebang

var mongoose = require('mongoose'),
	env      = require('../config/environment'),
	Promises = require('bluebird'),
	Card 	 = Promises.promisifyAll(require('../models/card')),
   Company   = Promises.promisifyAll(require('../models/company'));

mongoose.connect(env.config.mongo);

return Company.findAsync({}).then(function(companies) {
   function findCompany(slug) {
      var company = companies.filter(function(i) {
         return (i.slug === slug)
      })
      return (company[0] || null);
   }

   return Card.removeAsync({}).then(function(err) { 
      console.log('[populate] cards removed!') 

      var cardsToInsert = [],
          weDoLogos = findCompany('we-do-logos');

      if (weDoLogos) {
         cardsToInsert.push({
            title: 'Queremos te conhecer melhor, então venha para a we do logos',
            company: {
               id: weDoLogos._id,
               name: weDoLogos.name
            },
            date: { 
               limit: new Date()
            },
            days: {
               full: '26, 27 e 28 de Abril'
            },
            category: 'development',
            slug: 'dev',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem error aperiam at voluptates soluta in autem mollitia aspernatur dignissimos repudiandae neque perferendis temporibus a, sequi repellendus placeat consequatur eos necessitatibus earum, perspiciatis ad, pariatur magni! Dolor sapiente, eum eaque incidunt.',
            subscribers: {
               total: 2
            }
         });

         cardsToInsert.push({
            title: '[Design] Queremos te conhecer melhor, então venha para a we do logos',
            company: {
               id: weDoLogos._id,
               name: weDoLogos.name
            },
            date: { 
               limit: new Date()
            },
            days: {
               full: '26, 27 e 28 de Abril'
            },
            category: 'design',
            slug: 'design',
            description: 'Descrição!',
            subscribers: {
               total: 0
            }
         });

         cardsToInsert.push({
            title: '[Marketing] Queremos te conhecer melhor, então venha para a we do logos',
            company: {
               id: weDoLogos._id,
               name: weDoLogos.name
            },
            date: { 
               limit: new Date()
            },
            days: {
               full: '26, 27 e 28 de Abril'
            },
            category: 'martketing',
            slug: 'mkt',
            description: 'Descrição!',
            subscribers: {
               total: 0
            }
         });
      }

      return Promises.map(cardsToInsert, function(card) {
         return Card.createAsync(card)
      }).then(function (result) {
         console.log('[populate] cards created!');
      })
   })
})
	