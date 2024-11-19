async function createSchema() {
    if (await knex.SchemaBuilder.hasTable('history_products')) {
        return;
    }
    await knex.createTable('history_products', table => {
        table.increments('id').primary();
        table.integer('shop_id');
        table.date('date');
        table.string('action')

        table.foreign('shop_id').references('id').inTable('shops').onDelete('CASCADE')
    })
    await knex.schema.dropTableIfExists('history_products')
}
