const Knex = require("knex");

/**
 * @param {Knex} knex
 */

const tableNames = require("../../src/constants/tableNames");

let orderedTables = ["person", "item"];

exports.seed = async (knex) => {
  await orderedTables.reduce(async (promise, table_name) => {
    await promise;
    return knex(table_name).del();
  }, Promise.resolve());

  const person = {
    first_name: "John",
    last_name: "Doe",
    email_address: "johndoe@gmail.com",
    number_of_devices: 1,
  };

  const [createdPerson] = await knex(tableNames.person)
    .insert(person)
    .returning("*");

  const device = {
    name_of_item: "iPad Pro",
    description: "space grey 256gb 11in",
    person_id: 1,
  };

  const [createdDevice] = await knex(tableNames.item)
    .insert(device)
    .returning("*");

  console.log("User Created: ", createdPerson);
  console.log("Device Created: ", createdDevice);
};
