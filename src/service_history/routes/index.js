import fastify from 'fastify';
import * as handler from '../controllers/history_controller.js'
import * as schemas from '../schemas/schemas.js';

const app = fastify();

export const routes = async (fastify, options) => {
    app.get('/products_shop', { schema: scheme_filter_history }, handler.history_filter);

    app.get('/products_shop_count', { schema: scheme_filter_history }, handler.history_filter)
}
