async function createSchema() {
    if (await knex.SchemaBuilder.hasTable('products_shops')) {
        return;
    }
    await knex.createTable('products_shops', table => {
        table.increments('id').primary();
        table.integer('shop_id');
        table.string('product_id');
        table.string('product_count');

        table.foreign('shop_id').references('id').inTable('shops').onDelete('CASCADE')
        table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE')
    })
    await knex.schema.dropTableIfExists('products_shops')
}
