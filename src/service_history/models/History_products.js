import { Model } from 'objection';
import { Products } from '../../service_remainder/models/Products.js';
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
    static get relationMappings() {
        return {
            children: {
                relation: Model.BelongsToOneRelation,
                modelClass: Products,
                join: {
                    from: 'history_products.product_plu',
                    to: 'products.plu'
                },
            }

        }
    }
}