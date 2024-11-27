import *  as models from '../models/Models.js'

export const scheme_filter_history = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                shop_id: { type: 'string' },
                page: { type: 'string' },
                plu: { type: 'string' },
                date_up: { type: 'string', format: 'date' },
                date_from: { type: 'string', format: 'date' },
            },
            required: [],
        }
    },
    response: {
        200: {
            anyof: [
                { $ref: models.History_products },
                { $ref: models.History_remainders },
            ]
        }
    }
}