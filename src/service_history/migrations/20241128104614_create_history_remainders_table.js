
export const up = async (knex) => await knex.schema.createTable('history_remainders', table => {
    table.increments('id').primary();
    table.integer('shop_id');
    table.date('date');
    table.string('action')


})

export const down = async (knex) => await knex.schema.dropTableIfExists('history_remainders')
