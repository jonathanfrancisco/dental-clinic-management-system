exports.up = function(knex, Promise) {
   return knex.schema.table('patient_child_teeth_chart', function(table) {
      table.integer('id').unsigned().primary().notNullable();
   });
};
   
exports.down = function(knex, Promise) {

};



