exports.up = function(knex, Promise) {
   return knex.schema.table('treatment', function(table) {
     table.integer('balance');
   });
};
   
exports.down = function(knex, Promise) {

};