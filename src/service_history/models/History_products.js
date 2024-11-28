import { Model } from 'objection';
import { pg } from '../db_connection/connection.js'
Model.knex(pg)
export
    class History_products extends Model {
    static get tableName() {
        return 'history_products'
    };

    static get idColumn() {
        return 'id';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['product_plu', 'date', 'action'],

            properties: {
                id: { type: 'integer' },
                product_plu: { type: 'integer' },
                date: { type: 'string', format: 'date' },
                action: { type: 'string' },
            }
        }
    };
}