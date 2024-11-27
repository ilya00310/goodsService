import * as models from '../models/Models.js';
import { format } from 'date-fns'
import _ from 'lodash';

export const history_filter = async (req, reply) => {
    const filter = req.query;
    const page = req.query.page ? req.query.page - 1 : 0;
    const size = 5;
    const queryProducts = models.History_products.query().select('id', 'product_plu', 'date', 'action');
    const queryRemainders = models.History_remainders.query().select('id', 'shop_id', 'date', 'action');
    const keys = Object.keys(req.query).filter((item) => item !== 'page');
    try {
        if (filter.shop_id) {
            queryRemainders.where('shop_id', filter.shop_id);
            if (keys.length === 1) {
                return reply.code(200).send(await queryRemainders);
            }
        }
        if (filter.plu) {
            queryProducts.where('product_plu', filter.plu);
            if (keys.length === 1) {
                return reply.code(200).send(await queryProducts);
            }
        }
        if (filter.action) {
            queryRemainders.where('action', filter.action)
            queryProducts.where('action', filter.action);
        }
        if (filter.date_from) {
            queryProducts.where('date', '>=', filter.date_from)
            queryRemainders.where('date', '>=', filter.date_from);
        }
        if (filter.date_up) {
            queryProducts.where('date', '<=', filter.date_up);
            queryRemainders.where('date', '<=', filter.date_up)
        }
        const result = [...await queryProducts, ...await queryRemainders]
        reply.code(200).send(_.chunk(result, size)[page]);
    } catch (err) {
        console.error(err)
        reply.code(500).send({ message: "Произошла ошибка на сервере" })
    }
}