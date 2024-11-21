export const up = async (knex) => {
    return await knex.schema.createTable('orders', table => {
        table.increments('id').primary();
        table.string('order_address');
    })

}

export const down = async (knex) => await knex.schema.dropTableIfExists('orders')
