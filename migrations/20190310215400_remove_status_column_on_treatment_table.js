exports.up = function(knex, Promise) {
   return knex.schema.table('treatment', function(table) {
     table.dropColumn('status');
   });
};
   
exports.down = function(knex, Promise) {

};