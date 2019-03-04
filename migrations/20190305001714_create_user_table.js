exports.up = function(knex, Promise) {
   return knex.schema.createTable('user', function(table) {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.string('first_name').notNullable()
      table.string('middle_name').nullable();
      table.string('last_name').notNullable();
      table.datetime('birthday').notNullable();
      table.string('address').notNullable();
      table.string('role').notNullable();
   });
};
   
exports.down = function(knex, Promise) {

};