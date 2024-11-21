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
    const filter_name = req.query.name;
    const filter_value = req.query.value
    try {
        const filter_products = await models.Products.query()
            .select('id', 'plu', 'name')
            .where(filter_name, filter_value)
            .first()
        await modelsHistory.History_products.query()
            .insert({
                product_plu: filter_products.plu,
                date: format(new Date(), 'yyyy-MM-dd'),
                action: 'Filter products'
            });
        return reply.code(200).send(filter_products)

    } catch (err) {
        throw new Error(err);
    }
}

export const remainder_filters = async (req, reply) => {
    const filter_name = req.query.name;
    const filter_value = req.query.value;
    let shop_id_for_count_filter;
    let result;
    try {
        if (filter_name === 'plu') {
            const id_products = await models.Products.query()
                .select('id')
                .where('plu', filter_value)
                .first();
            result = await models.Products_shops.query()
                .select('id', 'shop_id', 'product_id', 'product_count')
                .where('product_id', id_products.id)
                .first()
        } else if (filter_name === 'shop_id') {
            result = await models.Products_shops.query()
                .select('id', 'shop_id', 'product_id', 'product_count')
                .where('shop_id', filter_value)
                .first();
        }
        else if (filter_name === 'product_count_from' || filter_name === 'product_count_up') {
            shop_id_for_count_filter = Number(req.query.shop_id)
            const max_value = await models.Products_shops.query()
                .max('product_count')
                .first();
            const first_value_product = filter_name === 'product_count_from' ? filter_value : 0;
            const last_value_product = filter_name === 'product_count_up' ? filter_value : max_value.max
            result = await models.Products_shops.query()
                .select('id', 'shop_id', 'product_id', 'product_count')
                .where('product_count', '>=', first_value_product)
                .where('product_count', '<=', last_value_product)
                .where('shop_id', shop_id_for_count_filter)
        }
        else if (filter_name === 'order_count_from' || filter_name === 'order_count_up') {
            shop_id_for_count_filter = Number(req.query.shop_id)
            const max_remainders = await models.Info_orders.query()
                .select(models.Info_orders.raw('MAX(inf.product_count - prod.product_count) AS max_remainder'))
                .from('info_orders AS inf')
                .leftJoin('products_orders AS prod', function () {
                    this.on('inf.order_id', '=', 'prod.order_id')
                        .andOn('inf.product_id', '=', 'prod.product_id')
                        .andOn('inf.shop_id', '=', 'prod.product_id')
                })
                .first();
            const first_value_orders = filter_name === 'order_count_from' ? filter_value : 0;
            const last_value_orders = filter_name === 'order_count_up' ? filter_value : max_remainders.max_remainder
            result = await models.Info_orders.query()
                .select('inf.id',
                    'inf.order_id',
                    'inf.product_id',
                    'inf.shop_id',
                    models.Info_orders.raw('(inf.product_count - prod.product_count) AS products_count'))
                .from('info_orders AS inf')
                .leftJoin('products_orders AS prod', function () {
                    this.on('prod.order_id', '=', 'inf.order_id')
                        .andOn('prod.product_id', '=', 'inf.product_id')
                        .andOn('inf.shop_id', '=', 'prod.product_id')
                })
                .where('inf.shop_id', shop_id_for_count_filter)
                .whereRaw((`inf.product_count - prod.product_count >= ? AND inf.product_count - prod.product_count  <= ?`), [first_value_orders, last_value_orders])
        }
        await modelsHistory.History_remainders.query()
            .insert({
                shop_id: shop_id_for_count_filter ?? result.shop_id,
                date: format(new Date(), 'yyyy-MM-dd'),
                action: 'filter remainders'
            });
        return reply.code(200).send(result)
    } catch (err) {
        throw new Error(err)
    }
}