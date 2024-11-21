import { Model } from 'objection';
import { pg } from '../db_connection/connection.js'

Model.knex(pg)
export
    class Orders extends Model {
    static get tableName() {
        return 'orders'
    };

    static get idColumn() {
        return 'id';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['order_address'],
            properties: {
                id: { type: 'integer' },
                order_address: { type: 'string', minLength: 1 },
            }
        }
    };
}