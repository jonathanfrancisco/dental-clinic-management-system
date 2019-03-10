exports.up = function(knex, Promise) {
   return knex.schema.createTable('installment_payment_history', function(table) {
      table.increments('id').primary();
      table.integer('amount_paid').notNullable();
      table.integer('date_paid').notNullable();
      table.integer('current_balance_before').notNullable();
      table.integer('new_balance_after').notNullable();
      table.integer('treatment_id').unsigned().notNullable().references('id').inTable('treatment'); 
      table.integer('user_id').unsigned().notNullable().references('id').inTable('user');
   })
};

exports.down = function(knex, Promise) {

};