export const seed = async (knex) => {
    const history_remainders_one_exist = await knex('history_products')
        .where({ product_plu: 3, date: '2025.04.02', action: 'Filter products' })
        .first();
    const history_remainders_two_exist = await knex('history_products')
        .where({ product_plu: 1, date: '2015.06.03', action: 'Insert new product' })
        .first();
    const history_remainders_three_exist = await knex('history_products')
        .where({ product_plu: 2, date: '2020.01.03', action: 'Filter products' })
        .first();

    if (!history_remainders_one_exist) {
        await knex('history_products').insert({
            product_plu: 3,
            date: '2022.01.02',
            action: 'Filter products'
        })
    }
    if (!history_remainders_two_exist) {
        await knex('history_products').insert({
            product_plu: 1,
            date: '2020.06.03',
            action: 'Insert new product'
        })
    }
    if (!history_remainders_three_exist) {
        await knex('history_products').insert({
            product_plu: 2,
            date: '2019.01.03',
            action: 'Filter products'
        })
    };
}