import { Model } from 'objection';
import { Orders } from './Orders.js';
import { Products } from './Products.js';
import { Shops } from './Shops.js';
import { pg } from '../db_connection/connection.js'

Model.knex(pg)
export
    class Products_orders extends Model {
    static get tableName() {
        return 'products_orders'
    };

    static get idColumn() {
        return 'id';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['order_id', 'product_id', 'shop_id', 'product_count'],

            properties: {
                id: { type: 'integer' },
                order_id: { type: 'integer' },
                product_id: { type: 'integer' },
                shop_id: { type: 'integer' },
                product_count: { type: 'integer' },
            }
        }
    };
    static get relationMappings() {
        return {
            children: {
                relation: Model.BelongsToOneRelation,
                modelClass: Products,
                join: {
                    from: 'products_orders.product_id',
                    to: 'products.id'
                },
                relation: Model.BelongsToOneRelation,
                modelClass: Orders,
                join: {
                    from: 'products_orders.order_id',
                    to: 'orders.id'
                },
                relation: Model.BelongsToOneRelation,
                modelClass: Shops,
                join: {
                    from: 'products_orders.shop_id',
                    to: 'shops.id'
                }
            }

        }
    }
}