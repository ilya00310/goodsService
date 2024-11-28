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
                { $ref: models.History_products.jsonSchema },
                { $ref: models.History_remainders.jsonSchema },
            ]
        }
    }
}

export const scheme_history_products = {
    schema: {
        body: models.History_products.jsonSchema
    },
}

export const scheme_history_remainders = {
    schema: {
        body: models.History_remainders.jsonSchema
    },
}