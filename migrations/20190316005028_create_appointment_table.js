exports.up = function(knex, Promise) {
   return knex.schema.createTable('appointment', function(table) {
      table.increments('id').primary();
      table.datetime('date_time').notNullable();
      table.string('reason').notNullable();
      table.string('status').notNullable();
      table.integer('patient_id').notNullable();
      table.string('contact_number').nullable();
   })
};

exports.down = function(knex, Promise) {

};