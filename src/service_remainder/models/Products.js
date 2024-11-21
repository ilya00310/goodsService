import { Model } from 'objection';
import { pg } from '../db_connection/connection.js'

Model.knex(pg)

export
    class Products extends Model {
    static get tableName() {
        return 'products'
    };

    static get idColumn() {
        return 'id';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ["plu", "name"],

            properties: {
                id: { type: 'integer' },
                plu: { type: 'integer' },
                name: { type: 'string', minLength: 1 },
            }
        }
    };
}
