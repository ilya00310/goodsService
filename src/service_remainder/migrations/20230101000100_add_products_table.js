export const up = async (knex) => {
    if (await knex.schema.hasTable('products')) {
        return;
    }
    return await knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.integer('plu').unique();
        table.string('name').unique();
    })

}
export const down = async (knex) => await knex.schema.dropTableIfExists('products')
