import { Model } from 'objection';
import { Products } from '../../service_remainder/models/Products.js';
export
    class History_products extends Model {
    static get tableName() {
        return 'history_products'
    };

    static get idColumn() {
        return 'Id';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['product_plu', 'date', 'action'],

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
                modelClass: Products,
                join: {
                    from: 'history_products.plu',
                    to: 'products.id'
                },
            }

        }
    }
}