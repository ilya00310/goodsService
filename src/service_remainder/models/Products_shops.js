import { Model } from 'objection';
import { Shops } from './Shops.js';
import { Products } from './Products.js';
import { pg } from '../db_connection/connection.js'

Model.knex(pg)
export
    class Products_shops extends Model {
    static get tableName() {
        return 'products_shops'
    };

    static get idColumn() {
        return 'id';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['shop_id', 'product_id', 'product_count'],

            properties: {
                id: { type: 'integer' },
                shop_id: { type: 'integer' },
                product_id: { type: 'integer' },
                product_count: { type: 'integer' },
            }
        }
    };
    static get relationMappings() {
        return {
            children: {
                relation: Model.BelongsToOneRelation,
                modelClass: Shops,
                join: {
                    from: 'products_shops.shop_id',
                    to: 'shops.id'
                },
                relation: Model.BelongsToOneRelation,
                modelClass: Products,
                join: {
                    from: 'products_shops.product_id',
                    to: 'products.id'
                }
            }

        }
    }
}