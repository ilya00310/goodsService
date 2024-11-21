import { Model } from 'objection';
import { Shops } from '../../service_remainder/models/Shops.js';

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
    static get relationMappings() {
        return {
            children: {
                relation: Model.BelongsToOneRelation,
                modelClass: Shops,
                join: {
                    from: 'history_remainders.shop_id',
                    to: 'shops.id'
                },
            }

        }
    }
}