exports.up = function(knex, Promise) {
   return knex.schema.table('user', function(table) {
      table.string('emailaddress').nullable();
      table.integer('patient_id').unsigned().nullable(); 
   });
};
   
exports.down = function(knex, Promise) {

};



