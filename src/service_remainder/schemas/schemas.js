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
                plu: { type: 'string' },
                name: { type: 'string' },
            },
            required: []
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
                plu: { type: 'string' },
                shop_id: { type: 'string' },
                action: { type: 'string' },
                product_count_up: { type: 'string' },
                product_count_from: { type: 'string' },
                order_count_up: { type: 'string' },
                order_count_from: { type: 'string' },
            },
            required: []
        },
        response: {
            200: {
                anyof: [
                    { $ref: models.Info_orders.jsonSchema },
                    { $ref: models.Products_shops.jsonSchema },
                ]
            }
        }
    }
}