const Knex = require("knex");

const tableNames = require("../../src/constants/tableNames");

function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.datetime("deleted_at");
}
/**
 * @param {Knex} knex
 */

exports.up = async function (knex) {
  await knex.schema.createTable(tableNames.person, (table) => {
    table.increments().notNullable();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email_address", 254).notNullable().unique();
    table.integer("number_of_devices").notNullable();
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.item, (table) => {
    table.increments().notNullable();
    table.string("name_of_item").notNullable();
    table.string("description").notNullable();
    table.integer('person_id').unsigned();
    table.foreign('person_id').references('person.id').onDelete('cascade');
    table.boolean('currently_in_use');
    addDefaultColumns(table);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable(tableNames.item);
  await knex.schema.dropTable(tableNames.person);
};
