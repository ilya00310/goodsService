// фильтр по shop_id, plu, action
export const scheme_filter_history = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                value: { type: 'string' },
            }
        }
    }
}

export const scheme_filter_history_date = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                value: { type: 'string', format: 'date' }
            }
        }
    }
}