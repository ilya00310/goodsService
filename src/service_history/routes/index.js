import * as handler from '../controllers/history_controller.js'
import * as schemas from '../schemas/schemas.js';


export const routes = async (fastify, options) => {
    fastify.get('/history', schemas.scheme_filter_history, handler.history_filter);
}
