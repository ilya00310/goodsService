import { Model } from 'objection';

export
    class Orders extends Model {
    static get tableName() {
        return 'orders'
    };

    static get idColumn() {
        return 'Id';
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