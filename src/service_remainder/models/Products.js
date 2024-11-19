import { Model } from 'objection';

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
            required: ['plu', 'name'],

            properties: {
                id: { type: 'integer' },
                plu: { type: 'integer' },
                name: { type: 'string', minLength: 1 },
            }
        }
    };
}
