import * as models from '../models/Models.js';
import { format } from 'date-fns'
import _ from 'lodash';

const format_date = (date) => format(date, 'yyyy-MM-dd')
export const history_filter = async (req, reply) => {
    const filter_name = req.query.name;
    const filter_value = req.query.value
    const page = req.query.page - 1;
    const size = req.query.size ?? 5;
    let result;
    try {
        if (filter_name === 'shop_id') {
            result = await models.History_remainders.query()
                .select('id', 'shop_id', 'date', 'action')
                .where('shop_id', filter_value);
        } else if (filter_name === 'plu') {
            result = await models.History_products.query()
                .select('id', 'product_plu', 'date', 'action')
                .where('product_plu', filter_value);
        } else if (filter_name === 'action') {
            const filter_action_products = await models.History_products.query()
                .select('id', 'product_plu', 'date', 'action')
                .where('action', filter_value)
            const filter_action_remainders = await models.History_remainders.query()
                .select('id', 'shop_id', 'date', 'action')
                .where('action', filter_value)
            result = [...filter_action_products, ...filter_action_remainders]
        } else if (filter_name === 'date_from' || filter_name === 'date_up') {
            const { max_products } = await models.History_products.query()
                .select(models.History_products.raw(`MAX(date) AS max_products`))
                .first()
            const { max_remainders } = await models.History_remainders.query()
                .select(models.History_remainders.raw(`MAX(date) AS max_remainders`))
                .first()
            const max_item = format_date(max_products) > format_date(max_remainders) ? format_date(max_products) : format_date(max_remainders)
            const first_value = filter_name === 'date_from' ? filter_value : format(new Date(0), 'yyyy-MM-dd');
            const last_value = filter_name === 'date_up' ? filter_value : max_item;
            const filter_one_table = await models.History_products.query()
                .select('id', 'product_plu', 'date', 'action')
                .where('date', '>=', first_value)
                .where('date', '<=', last_value);
            const filter_two_table = await models.History_remainders.query()
                .select('id', 'shop_id', 'date', 'action')
                .where('date', '>=', first_value)
                .where('date', '<=', last_value)
            result = [...filter_one_table, ...filter_two_table]
        }
        reply.code(200).send(_.chunk(result, size)[page]);
    } catch (err) {
        throw new Error(err)
    }
}