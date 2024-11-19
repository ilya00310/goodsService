async function createSchema() {
    if (await knex.SchemaBuilder.hasTable('shops')) {
        return;
    }
    await knex.createTable('shops', table => {
        table.increments('id').primary();
        table.string('name');
    })

    await knex.schema.dropTableIfExists('shops')
}   