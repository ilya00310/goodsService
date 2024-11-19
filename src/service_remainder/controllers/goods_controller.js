import * as models from '../models/Models.js';
import * as modelsHistory from '../../service_history/models/Model.js';



// создать нового продукта, попадает артикул, название.
export const create_product = async (req, reply) => {
    const { plu, name } = req.body;
    try {
        await models.Products.query().insert({
            plu,
            name,
        })
        // записываю создание продукта 
        await modelsHistory.History_products.query()
            .insert({
                product_plu: plu,
                date: Date.now(),
                action: 'Insert new product'
            });
        reply.code(201)
    } catch (err) {
        throw new Error(err);
    }
}

// Создание остатков. попадает id магазина,id продукта, указывается его сотавшееся кол-во, 
// остаток в заказе не задается, получается на основе продуктов в заказе и ожидаемого заказа 
export const create_remainder = async (req, reply) => {
    const { shop_id, product_id, product_count } = req.body;
    try {
        await models.Products_shops.query().insert({
            shop_id,
            product_id,
            product_count,
        })
        // записываю создание остатка
        await modelsHistory.History_remainders.query()
            .insert({
                shop_id,
                date: Date.now(),
                action: 'insert new remainders'
            });
        reply.code(201)
    } catch (err) {
        throw new Error(err)
    }
}

// Изменение остатка. Попадает число, id магазина и id продукта, в query string действие
export const changed_remainder = async (req, reply) => {
    const { id, shop_id, product_id, product_count } = req.body;
    const action = req.query.action;
    try {
        const current_count_product = await models.Products_shops.query()
            .select('product_count')
            .where('shop_id', `${shop_id}`)
            .where('product_id', `${product_id}`)
            .first()
        const new_count_product = action === 'increase' ? current_count_product + product_count : current_count_product - product_count
        await models.Products_shops.query()
            .findById(id)
            .patch({ product_count: new_count_product });
        // Записываю изменение остатков 
        await modelsHistory.History_remainders.query()
            .insert({
                shop_id,
                date: Date.now(),
                action: 'Changed remainders'
            })
        reply.code(200)
    } catch (err) {
        throw new Error(err)
    }
}

//Фильтрация товаров, все через query string
export const products_filter = async (req, reply) => {
    const filter_name = req.query.name;
    const filter_value = req.query.value
    try {
        const filter_products = await models.Products.query()
            .select('id', 'plu', 'name')
            .where(filter_name, filter_value)
        // записываю создание остатка
        await modelsHistory.History_products.query()
            .insert({
                product_plu: filter_products.plu,
                date: Date.now(),
                action: 'insert new remainders'
            });
        return filter_products

    } catch (err) {
        throw new Error(err);
    }
}

// Фильтрация остатков, все через query string
export const remainder_filters = async (req, reply) => {
    const filter_name = req.query.name;
    const filter_value = req.query.value;
    try {
        switch (true) {
            case filter_name === 'plu':
                // нахожу соответсвие id данному артикулу и фильтрую по нему
                const id_products = await models.Products.query()
                    .select('id')
                    .where('plu', filter_value);
                const filter_plu = await models.Products_shops.query()
                    .select('shop_id', 'product_id', 'product_count')
                    .where('product_id', `${id_products}`);
                // записываю действие
                await modelsHistory.History_remainders.query()
                    .insert({
                        shop_id: filter_plu.shop_id,
                        date: Date.now(),
                        action: 'filter remainders'
                    })
                return filter_plu
            case filter_name === 'shop_id':
                // сразу фильтрую по shop_id
                const filter_shop_id = await models.Products_shops.query()
                    .select('shop_id', 'product_id', 'product_count')
                    .where('shop_id', `${filter_value}`)
                // записываю действие
                await modelsHistory.History_remainders.query()
                    .insert({
                        shop_id: filter_shop_id.shop_id,
                        date: Date.now(),
                        action: 'filter remainders'
                    });
                return filter_shop_id
            default:
                throw new Error('don\'t support condition for filter')
        }
    } catch (err) {
        throw new (err)
    }
}

// фильтрация кол-ва остатков
export const remainder_filters_count = async (req, reply) => {
    const filter_name = req.query.name;
    const filter_value = Number(req.query.value);
    try {
        switch (true) {
            case filter_name === 'product_count_from' || filter_name === 'product_count_up':
                // начинаем либо с нуля, либо с заданного значения 
                const first_value_product = filter_name === 'product_count_from' ? filter_value : 0;
                // заканчиваем либо заданным значением, либо максимально возможным 
                const last_value_product = filter_name === 'product_count_up' ? filter_value : await models.Products_shops
                    .query()
                    .max('product_count')
                    .first();
                const filter_remainder_shops = await models.Products_shops.query()
                    .select('shop_id', 'product_id', 'products')
                    .where('product_count', '>=', first_value_product)
                    .where('product_count', '<=', last_value_product);
                // записываю действие
                await modelsHistory.History_remainders.query()
                    .insert({
                        shop_id: filter_remainder_shops.shop_id,
                        date: Date.now(),
                        action: 'filter remainders'
                    });
                return filter_remainder_shops
            case filter_name === 'order_count_from' || filter_name === 'order_count_up':
                // начинаем либо с нуля, либо с заданного значения 
                const first_value_orders = filter_name === 'order_count_from' ? filter_value : 0;
                // заканчиваем либо этим значение, либо максимальным числом остатка, чтобы произвести вычитание, используем raw
                const last_value_orders = filter_name === 'order_count_up' ? filter_value : await models.Info_orders.query()
                    .select(models.info_orders.raw('inf.product_count - prod.product_count'))
                    .from('info_orders AS inf')
                    .leftJoin('product_orders AS prod', function () {
                        this.on('product_orders.order_id', '=', 'info_orders.order_id')
                            .andOn('product_orders.product_id', '=', 'info_orders.product_id');
                    })
                    .max(models.info_orders.raw('inf.product_count - prod.product_count'))
                    .first();
                const filter_remainder_order = await models.Info_orders.query()
                    .select('inf.order_id',
                        'inf.order_id',
                        models.info_orders.raw('inf.product_count - prod.product_count'))
                    .from('info_orders AS inf')
                    .leftJoin('product_orders AS prod', function () {
                        this.on('product_orders.order_id', '=', 'info_orders.order_id')
                            .andOn('product_orders.product_id', '=', 'info_orders.product_id');
                    })
                    .whereRaw((`inf.product_count - prod.product_count >= ? AND inf.product_count - prod.product_count  <= ?`), [first_value_orders, last_value_orders])
                // записываю действие
                await modelsHistory.History_remainders.query()
                    .insert({
                        shop_id: filter_remainder_order.shop_id,
                        date: Date.now(),
                        action: 'filter remainders'
                    });
                return filter_remainder_order
            default:
                throw new Error('don\'t support condition for filter')

        }
    } catch (err) {
        throw new Error(err);
    }

}
