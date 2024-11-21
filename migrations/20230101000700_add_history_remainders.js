export const up = async (knex) => await knex.schema.createTable('history_remainders', table => {
    table.increments('id').primary();
    table.integer('shop_id');
    table.date('date');
    table.string('action')

    table.foreign('shop_id').references('id').inTable('shops').onDelete('CASCADE')
})

export const down = async (knex) => await knex.schema.dropTableIfExists('history_remainders')
