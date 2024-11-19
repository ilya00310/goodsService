async function createSchema() {
    if (await knex.SchemaBuilder.hasTable('history_remainders')) {
        return;
    }
    await knex.createTable('history_remainders', table => {
        table.increments('id').primary();
        table.integer('product_id');
        table.date('date');
        table.string('action')

        table.foreign('product_id').references('id').inTable('products').onDelete('CASCADE')
    })
    await knex.schema.dropTableIfExists('history_products')
}
