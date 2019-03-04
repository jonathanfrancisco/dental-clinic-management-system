
exports.up = function(knex, Promise) {
   return knex.schema.createTable('patient', function(table) {
      table.increments();
      table.string('code').notNUllable();
      table.string('name').notNullable();
      table.string('address').notNullable();
      table.datetime('birthday').notNullable()
      table.string('occupation').nullable();
      table.string('civil_status').nullable();
      table.string('contact_number').nullable();
      table.datetime('last_visit').notNullable();
   })
};

exports.down = function(knex, Promise) {
  
};