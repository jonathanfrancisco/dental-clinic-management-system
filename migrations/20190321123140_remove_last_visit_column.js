exports.up = function(knex, Promise) {
   return knex.schema.table('patient', function(table) {
     table.dropColumn('last_visit');
   });
};
   
exports.down = function(knex, Promise) {

};