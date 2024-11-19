async function createSchema() {
    if (await knex.SchemaBuilder.hasTable('products_orders')) {
        return;
    }
    await knex.createTable('products_orders', table => {
        table.increments('id').primary();
        table.integer('order_id');
        table.string('product_id');
        table.integer('product_count')

        table.foreign('order_id').references('id').inTable('orders').onDelete('CASCADE')
        table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE')
    })
    await knex.schema.dropTableIfExists('products_orders')
}
