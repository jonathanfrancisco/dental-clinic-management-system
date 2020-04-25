exports.up = function (knex, Promise) {
  return knex.schema.createTable('patient_child_teeth_chart', function (table) {
    table.integer('id').unsigned().primary().notNullable();
    table.string('UR_A').nullable();
    table.string('UR_B').nullable();
    table.string('UR_C').nullable();
    table.string('UR_D').nullable();
    table.string('UR_E').nullable();
    table.string('UL_F').nullable();
    table.string('UL_G').nullable();
    table.string('UL_H').nullable();
    table.string('UL_I').nullable();
    table.string('UL_J').nullable();
    table.string('LL_K').nullable();
    table.string('LL_L').nullable();
    table.string('LL_M').nullable();
    table.string('LL_N').nullable();
    table.string('LL_O').nullable();
    table.string('LR_P').nullable();
    table.string('LR_Q').nullable();
    table.string('LR_R').nullable();
    table.string('LR_S').nullable();
    table.string('LR_T').nullable();
  });
};

exports.down = function (knex, Promise) {};
