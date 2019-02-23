const dbconfig = require('../knexfile');
const {Model} = require('objection');
const Knex = require('knex');
const knex = Knex(dbconfig.development);

Model.knex(knex)

module.exports = Model;