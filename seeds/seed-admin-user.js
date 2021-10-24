const User = require("../models/User");

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
            username: 'admin',
            password: '$2a$10$KfFuavBh0Hebla6Ja.EkpeOLJt1dNzEW/rkrglHSAykmFZBJPA9SK',
            name: 'Administrator',
            birthday: '2019-02-19 00:00:00',
            address: 'Internet',
            role: 'dentist',
            emailaddress: 'admin@gmail.com'
        },

      ]);
    });
  };