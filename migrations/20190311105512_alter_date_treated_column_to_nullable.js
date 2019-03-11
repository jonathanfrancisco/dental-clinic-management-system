exports.up = function(knex, Promise) {
   return knex.schema.alterTable('treatment', function(table) {
      table.datetime('date_treated').notNullable().alter();
   });
};
   
exports.down = function(knex, Promise) {

};