import * as handler from '../controllers/goods_controller.js'
import * as schemas from '../schemas/schemas.js';


export const routes = async (fastify, options) => {
    fastify.post('/products', schemas.scheme_create_product, handler.create_product)

    fastify.post('/products_shops', schemas.scheme_remainder, handler.create_remainder)

    fastify.patch('/products_shops/increase', schemas.scheme_changed_remainder, handler.increase_remainder)

    fastify.patch('/products_shops/decrease', schemas.scheme_changed_remainder, handler.decrease_remainder)

    fastify.get('/products', schemas.scheme_filter_product, handler.products_filter)

    fastify.get('/products_shops', schemas.scheme_filter_remainders, handler.remainder_filters)
}
