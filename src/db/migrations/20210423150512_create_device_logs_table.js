/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('device_logs', (table) => {
    table.increments();
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
    table.string('macId').notNull();
    table.string('deviceState').notNull();
    table.decimal('ax');
    table.decimal('ay');
    table.decimal('az');
    table.decimal('mean');
    table.decimal('comparedMean');
    table.decimal('period');
    table.decimal('offset');
    table.decimal('fiveMinuteMaxVibrationAmplitude');
    table.decimal('tenSecondMaxVibrationAmplitude').defaultTo(8);
  });
}

/**
 * Drop `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('device_logs');
}
