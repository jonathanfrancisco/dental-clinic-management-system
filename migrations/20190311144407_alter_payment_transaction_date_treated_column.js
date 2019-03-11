exports.up = function(knex, Promise) {
   return knex.schema.table('payment_transaction', function(table) {
      table.dropColumn('date_pai');
      table.datetime('date_paid').notNullable();
   });
};
   
exports.down = function(knex, Promise) {

};