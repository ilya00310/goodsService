import * as models from '../models/Models.js';
export const scheme_create_product = {
    schema: {
        body: models.Products.jsonSchema,
    }
}

export const scheme_remainder = {
    schema: {
        body: models.Products_shops.jsonSchema
    }
}

export const scheme_changed_remainder = {
    schema: {
        body: models.Products_shops.jsonSchema
    }
}


export const scheme_filter_product = {
    schema: {
        queryString: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                value: { type: 'string' },
            },
            required: ['name', 'value']
        },
        response: {
            200: models.Products.jsonSchema
        }
    }
}

export const scheme_filter_remainders = {
    schema: {
        queryString: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                value: { type: 'string' }
            },
            required: ['name', 'value']
        },
        response: {
            200: {
                anyof: [
                    { $ref: models.Info_orders },
                    { $ref: models.Products_shops },
                ]
            }
        }
    }
}