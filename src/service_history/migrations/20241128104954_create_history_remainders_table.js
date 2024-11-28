export const up = async (knex) => {
    return await knex.schema.createTable('history_products', table => {
        table.increments('id').primary();
        table.integer('product_plu');
        table.date('date');
        table.string('action')
    })
}
export const down = async (knex) => await knex.schema.dropTableIfExists('history_products')
