// called when the migration is applied
exports.up = function(knex, Promise) {
  return knex.schema.createTable('milestones', function(table) {
        table.integer('id');  
        table.string('description');
        table.date('date_achieved');
      })
};

// called on a migration rollback ('undo' the up function)
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('milestones')
};
