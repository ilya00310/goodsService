export const up = async (knex) => {
    if (await knex.schema.hasTable('shops')) {
        return;
    }
    return await knex.schema.createTable('shops', table => {
        table.increments('id').primary();
        table.string('name');
    })


}
export const down = async (knex) => await knex.schema.dropTableIfExists('shops')


