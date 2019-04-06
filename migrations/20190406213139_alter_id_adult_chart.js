exports.up = function(knex, Promise) {
   return knex.schema.table('patient_adult_teeth_chart', function(table) {
      table.dropColumn('id');
   });
};
   
exports.down = function(knex, Promise) {

};



