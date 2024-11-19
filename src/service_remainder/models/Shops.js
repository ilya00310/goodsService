import { Model } from 'objection';

export
    class Shops extends Model {
    static get tableName() {
        return 'shops'
    };

    static get idColumn() {
        return 'id';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
            }
        }
    };
}
