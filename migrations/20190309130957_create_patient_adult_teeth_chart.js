exports.up = function(knex, Promise) {
   return knex.schema.createTable('patient_adult_teeth_chart', function(table) {
      table.integer('patient_id').unsigned().primary().notNullable();
      table.string('UR_1').nullable();
      table.string('UR_2').nullable();
      table.string('UR_3').nullable();
      table.string('UR_4').nullable();
      table.string('UR_5').nullable();
      table.string('UR_6').nullable();
      table.string('UR_7').nullable();
      table.string('UR_8').nullable();
      table.string('UL_9').nullable();
      table.string('UL_10').nullable();
      table.string('UL_11').nullable();
      table.string('UL_12').nullable();
      table.string('UL_13').nullable();
      table.string('UL_14').nullable();
      table.string('UL_15').nullable();
      table.string('UL_16').nullable();
      table.string('LL_17').nullable();
      table.string('LL_18').nullable();
      table.string('LL_19').nullable();
      table.string('LL_20').nullable();
      table.string('LL_21').nullable();
      table.string('LL_22').nullable();
      table.string('LL_23').nullable();
      table.string('LL_24').nullable();
      table.string('LR_25').nullable();
      table.string('LR_26').nullable();
      table.string('LR_27').nullable();
      table.string('LR_28').nullable();
      table.string('LR_29').nullable();
      table.string('LR_30').nullable();
      table.string('LR_31').nullable();
      table.string('LR_32').nullable();
   })
};

exports.down = function(knex, Promise) {

};