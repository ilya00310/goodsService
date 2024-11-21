export const seed = async (knex) => {
    const history_remainders_one_exist = await knex('history_remainders')
        .where({ shop_id: 1, date: '2022.01.02', action: 'Insert new remainders' })
        .first();
    const history_remainders_two_exist = await knex('history_remainders')
        .where({ shop_id: 3, date: '2020.06.03', action: 'increase remainders' })
        .first();
    const history_remainders_three_exist = await knex('history_remainders')
        .where({ shop_id: 2, date: '2019.01.03', action: 'decrease remainders' })
        .first();

    if (!history_remainders_one_exist) {
        await knex('history_remainders').insert({
            shop_id: 1,
            date: '2022.01.02',
            action: 'Insert new remainders'
        })
    }
    if (!history_remainders_two_exist) {
        await knex('history_remainders').insert({
            shop_id: 3,
            date: '2020.06.03',
            action: 'increase remainders'
        })
    }
    if (!history_remainders_three_exist) {
        await knex('history_remainders').insert({
            shop_id: 2,
            date: '2019.01.03',
            action: 'decrease remainders'
        })
    };
}