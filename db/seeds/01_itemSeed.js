const Knex = require('knex');

/**
 * @param {Knex} knex
 */

 const tableNames = require('../../src/constants/tableNames');

exports.seed = async (knex) => {
    await knex(tableNames.item).del();


    const device = {
        name_of_item: 'iPad Pro',
        description: 'space grey 256gb 11in',
        person_id: 1,
        currently_in_use: true
    }

    const [createdDevice] = await knex(tableNames.item).insert(device).returning('*');
}