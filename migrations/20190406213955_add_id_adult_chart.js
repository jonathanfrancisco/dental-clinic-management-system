exports.up = function(knex, Promise) {
   return knex.schema.table('patient_adult_teeth_chart', function(table) {
      table.integer('id').unsigned().primary().notNullable();
   });
};
   
exports.down = function(knex, Promise) {

};



