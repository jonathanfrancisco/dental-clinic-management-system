
exports.up = function(knex, Promise) {
   return knex.schema.createTable('patient', function(table) {
      table.increments();
      table.string('name').notNullable();
      table.string('address').notNullable();
      table.string('birthday').notNullable()
      table.string('occupation').nullable();
      table.string('civil_status').nullable();
      table.datetime('contact_number').nullable();
      table.string('last_visit').notNullable();
   })
};

exports.down = function(knex, Promise) {
  
};