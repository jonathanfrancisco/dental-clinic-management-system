exports.up = function(knex, Promise) {
   return knex.schema.dropTable('installment_payment_history');
};

exports.down = function(knex, Promise) {

};