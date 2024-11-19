export async function createSchema() {
    if (await knex.SchemaBuilder.hasTable('orders')) {
        return;
    }

    await knex.createTable('orders', table => {
        table.increments('id').primary();
        table.string('order_address');
    })

    await knex.schema.dropTableIfExists('orders')
}   