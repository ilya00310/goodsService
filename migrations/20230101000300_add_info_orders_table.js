export const up = async (knex) => {
    return await knex.schema.createTable('info_orders', table => {
        table.increments('id').primary();
        table.integer('order_id');
        table.integer('product_id');
        table.integer('shop_id');
        table.integer('product_count');

        table.foreign('order_id').references('id').inTable('orders').onDelete('CASCADE')
        table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE')
        table.foreign('shop_id').references('id').inTable('shops').onDelete('CASCADE')
    })

}
export const down = async (knex) => await knex.schema.dropTableIfExists('info_orders')