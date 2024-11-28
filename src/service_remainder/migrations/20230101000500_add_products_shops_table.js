export const up = async (knex) => {
    if (await knex.schema.hasTable('products_shops')) {
        return;
    }
    return await knex.schema.createTable('products_shops', table => {
        table.increments('id').primary();
        table.integer('shop_id');
        table.integer('product_id');
        table.integer('product_count');

        table.foreign('shop_id').references('id').inTable('shops').onDelete('CASCADE')
        table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE')
    })

}

export const down = async (knex) => await knex.schema.dropTableIfExists('products_shops')