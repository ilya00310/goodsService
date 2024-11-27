import * as models from '../models/Models.js';
import * as modelsHistory from '../../service_history/models/Models.js';
import { format } from 'date-fns'

export const create_product = async (req, reply) => {
    const { plu, name } = req.body;
    try {
        await models.Products.query().insert({
            plu,
            name,
        })
        await modelsHistory.History_products.query()
            .insert({
                product_plu: plu,
                date: format(new Date(), 'yyyy-MM-dd'),
                action: 'Insert new product'
            });
        reply.code(201)
    } catch (err) {
        throw new Error(err);
    }
}

export const create_remainder = async (req, reply) => {
    const { shop_id, product_id, product_count } = req.body;
    try {
        await models.Products_shops.query().insert({
            shop_id,
            product_id,
            product_count,
        })
        await modelsHistory.History_remainders.query()
            .insert({
                shop_id,
                date: format(new Date(), 'yyyy-MM-dd'),
                action: 'insert new remainders'
            });
        reply.code(201)
    } catch (err) {
        throw new Error(err)
    }
}

export const increase_remainder = async (req, reply) => {
    const { shop_id, product_id, product_count } = req.body;

    try {
        const current_count_product = await models.Products_shops.query()
            .select('product_count')
            .where('shop_id', shop_id)
            .where('product_id', product_id)
            .first()
        const new_count_product = current_count_product.product_count + product_count
        await models.Products_shops.query()
            .patch({ product_count: new_count_product })
            .where('shop_id', shop_id)
            .where('product_id', product_id)
        await modelsHistory.History_remainders.query()
            .insert({
                shop_id,
                date: format(new Date(), 'yyyy-MM-dd'),
                action: 'increase remainders'
            })
        reply.code(200)
    } catch (err) {
        console.log(err.data[0].params)
        throw new Error(err)
    }
}

export const decrease_remainder = async (req, reply) => {
    const { shop_id, product_id, product_count } = req.body;
    try {
        const current_count_product = await models.Products_shops.query()
            .select('product_count')
            .where('shop_id', shop_id)
            .where('product_id', product_id)
            .first()
        const new_count_product = current_count_product.product_count - product_count
        await models.Products_shops.query()
            .patch({ product_count: new_count_product })
            .where('shop_id', shop_id)
            .where('product_id', product_id)
        await modelsHistory.History_remainders.query()
            .insert({
                shop_id,
                date: format(new Date(), 'yyyy-MM-dd'),
                action: 'decrease remainders'
            })
        reply.code(200)
    } catch (err) {
        throw new Error(err)
    }
}

export const products_filter = async (req, reply) => {
    const filter = req.query;
    let product;
    try {
        if (filter.plu) {
            product = await models.Products.query()
                .select('id', 'plu', 'name')
                .where('plu', filter.plu)
                .first()
        }
        if (filter.name) {
            product = await models.Products.query()
                .select('id', 'plu', 'name')
                .where('name', filter.name)
                .first()
        }
        await modelsHistory.History_products.query()
            .insert({
                product_plu: product.plu,
                date: format(new Date(), 'yyyy-MM-dd'),
                action: 'Filter products'
            });
        return reply.code(200).send(product)

    } catch (err) {
        throw new Error(err);
    }
}

export const remainder_filters = async (req, reply) => {
    const filter = req.query;
    const remainder = models.Products_shops.query().select('id', 'shop_id', 'product_id', 'product_count');

    try {
        if (filter.plu) {
            const id_products = await models.Products.query()
                .select('id')
                .where('plu', filter.plu)
                .first();
            if (!id_products) {
                reply.code(404).send('ID Not found')
            }
            remainder.where('product_id', id_products.id)
        }
        if (filter.shop_id) {
            remainder.where('shop_id', filter.shop_id)
        }
        if (filter.product_count_from) {
            remainder.where('product_count', '>=', filter.product_count_from)

        }
        if (filter.product_count_up) {
            remainder.where('product_count', '<=', filter.product_count_up)

        }
        if (filter.order_count_from || filter.order_count_up) {
            if (!filter.shop_id) {
                return reply.code(404).send('Store ID missing for filter')
            }
            const shop_id_for_count_filter = Number(req.query.shop_id)
            const orderCounts = await models.Info_orders.query()
                .select('inf.product_id', models.Info_orders.raw('SUM(inf.product_count - COALESCE(prod.product_count, 0)) AS order_count'))
                .from('info_orders AS inf')
                .leftJoin('products_orders AS prod', function () {
                    this.on('inf.order_id', '=', 'prod.order_id')
                        .andOn('inf.product_id', '=', 'prod.product_id')
                        .andOn('inf.shop_id', '=', 'prod.shop_id');
                })
                .where('inf.shop_id', shop_id_for_count_filter)
                .groupBy('inf.product_id');
            const orderCountMap = {};
            orderCounts.forEach(order => {
                orderCountMap[order.product_id] = order.order_count;
            });
            if (filter.order_count_from) {
                remainder.whereIn('product_id', Object.keys(orderCountMap).filter(id => orderCountMap[id] >= filter.order_count_from));
            }
            if (filter.order_count_up) {
                remainder.whereIn('product_id', Object.keys(orderCountMap).filter(id => orderCountMap[id] <= filter.order_count_up));
            }
        }
        const results = await remainder;
        if (results.length === 0) {
            return reply.code(404).send('No remainders found');
        }
        const shop_id = results[0].shop_id; await modelsHistory.History_remainders.query()
            .insert({
                shop_id,
                date: format(new Date(), 'yyyy-MM-dd'),
                action: 'filter remainders'
            });
        return reply.code(200).send(results)
    } catch (err) {
        throw new Error(err)
    }
}