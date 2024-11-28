import { Model } from 'objection';
import { pg } from '../db_connection/connection.js'
Model.knex(pg)
export
    class History_remainders extends Model {
    static get tableName() {
        return 'history_remainders'
    };

    static get idColumn() {
        return 'id';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['shop_id', 'date', 'action'],

            properties: {
                id: { type: 'integer' },
                shop_id: { type: 'integer' },
                date: { type: 'string', format: 'date' },
                action: { type: 'string' },
            }
        }
    };
}