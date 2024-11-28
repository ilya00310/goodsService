import * as handler from '../controllers/history_controller.js'
import * as schemas from '../schemas/schemas.js';


export const routes = async (fastify, options) => {
    fastify.get('/history', schemas.scheme_filter_history, handler.history_filter);

    fastify.post('/history_products', schemas.scheme_history_products, handler.add_history_products)

    fastify.post('/history_remainders', schemas.scheme_history_remainders, handler.add_history_remainders)

}

