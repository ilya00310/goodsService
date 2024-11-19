import { Products } from "../models/Products.js"
import { Products_shops } from "../models/Products_shops.js"

// Создание продукта. На вход параметры продукта
export const scheme_create_product = {
    schema: {
        params: Products.jsonSchema,
    }
}

// Создание остатка. На вход параметры products_shops
export const scheme_remainder = {
    schema: {
        params: Products_shops.jsonSchema
    }
}

// Изменение остатка. В строке запроса действие изменений (increase/decrease)
export const scheme_changed_remainder = {
    schema: {
        queryString: {
            type: 'object',
            properties: {
                action: { type: 'string' },
            },
            required: ['action']
        },
        params: Products_shops.jsonSchema
    }
}

//Фильтр продуктов. В строек запроса название элемента и его значение. Возвращаем 200 и массив фильтрованных значений
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
            200: {
                type: 'array',
                items: {
                    params: Products.jsonSchema
                }
            }
        }
    }
}
// Фильтр остатков по id и артикулу.В строке запроса название элемента и значение.
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
                type: 'array',
                items: {
                    params: Products_shops.jsonSchema

                }
            }
        }
    }
}

//Фильтр остатков по их кол-ву.В строке запроса название элемента + условие (product_count_from, product_count_up) 
export const scheme_filter_remainders_count = {
    schema: {
        queryString: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                value: { type: 'string' },
            },
            required: ['name', 'condition', 'value']
        },
        response: {
            200: {
                type: 'array',
            }
        }
    }
}