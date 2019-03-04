exports.up = function(knex, Promise) {
   return knex.schema.createTable('treatment', function(table) {
      table.increments('id').primary();
      table.string('status').notNullable();
      table.string('description').notNullable();
      table.string('tooth_affected_no').nullable();
      table.integer('total_amount_to_pay').nullable();
      table.string('payment_type').notNullable();
      table.datetime('date_treated').nullable();
      table.integer('patient_id').unsigned().notNullable().references('id').inTable('patient'); 
      table.integer('user_id').unsigned().notNullable().references('id').inTable('user');
   });
};
   
exports.down = function(knex, Promise) {

};