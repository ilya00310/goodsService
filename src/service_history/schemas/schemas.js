import *  as models from '../models/Models.js'

export const scheme_filter_history = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                value: { type: 'string' },
            },
            required: ['name', 'value']
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