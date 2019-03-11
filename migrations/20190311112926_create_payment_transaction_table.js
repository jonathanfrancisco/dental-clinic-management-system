exports.up = function(knex, Promise) {
   return knex.schema.createTable('payment_transaction', function(table) {
      table.increments('id').primary();
      table.integer('amount_paid').notNullable();
      table.integer('date_paid').notNullable();
      table.integer('current_balance_before').nullable();
      table.integer('new_balance_after').nullable();
      table.integer('treatment_id').unsigned().notNullable().references('id').inTable('treatment'); 
      table.integer('user_id').unsigned().notNullable().references('id').inTable('user');
   })
};

exports.down = function(knex, Promise) {

};