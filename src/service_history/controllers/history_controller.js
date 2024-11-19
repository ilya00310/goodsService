import * as models from '../models/Models.js';


const select_history_item = (table, item, filter_value) => table.query()
    .select(item, 'date', 'action')
    .where(item, filter_value);

export const history_filter = async (req, reply) => {
    const filter_name = req.query.name;
    const filter_value = req.query.value
    try {
        switch (true) {
            // фильтрация по значению shop_id
            case filter_name === 'shop_id':
                const filter_shop_id = await select_history_item(models.History_remainders, 'shop_id', filter_value);
                return filter_shop_id
            // фильтрация по значению plu
            case filter_name === 'plu':
                const filter_plu = await select_history_item(models.History_products, 'product_plu', filter_value);
                return filter_plu
            case filter_name === 'action':
                // фильтрую таблицы и обьединяю 
                const filter_action_products = await select_history_item(models.History_products, 'product_plu', filter_value)
                const filter_action_remainder = await select_history_item(models.History_remainders, 'shop_id', filter_value)
                return [...filter_action_products, ...filter_action_remainder];
        }
    } catch (err) {
        throw new Error(err);
    }
}
const get_max_item = async (table_one, table_two, item) => {
    const oneMax = await table_one.query()
        .select(item)
        .max(item)
        .first();
    const twoMax = await table_two.query()
        .select(item)
        .max(item)
        .first();
    return Math.max(oneMax, twoMax)
}
const get_filter_item = async (table, first, last, item_table) => await table.query()
    .select(item_table, 'date', 'action')
    .where('date', '>=', first)
    .where('date', '<=', last);
export const history_filter_count = async () => {
    const filter_name = req.query.name;
    const filter_value = req.query.value
    // Берем максимальные числа, и выбираем самую максимально возможную дату 
    const max_history_products = await get_max_item(models.History_products, models.History_remainders, 'action');
    const first_value = filter_name === 'date_from' ? filter_value : new Date(0);
    const last_value = filter_name === 'date_up' ? filter_value : max_history_products;
    const filter_one_table = await get_filter_item(models.History_products, first_value, last_value, 'product_plu');
    const filter_two_table = await get_filter_item(models.History_remainders, first_value, last_value, 'shop_id');
    return [...filter_one_table, ...filter_two_table]
}