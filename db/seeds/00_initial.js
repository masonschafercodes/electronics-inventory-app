const Knex = require('knex');

/**
 * @param {Knex} knex
 */

 const tableNames = require('../../src/constants/tableNames');

exports.seed = async (knex) => {
    await knex(tableNames.person).del();


    const person = {
        first_name: 'Mason',
        last_name: 'Schafer',
        email_address: 'this is blank for a reason lol',
        number_of_devices: 1
    }

    const [createdPerson] = await knex(tableNames.person).insert(person).returning('*');
}