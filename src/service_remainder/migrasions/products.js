async function createSchema() {
    if (await knex.SchemaBuilder.hasTable('products')) {
        return;
    }
    await knex.createTable('products', table => {
        table.increments('id').primary();
        table.integer('plu');
        table.string('name');
    })

    await knex.schema.dropTableIfExists('products')
}