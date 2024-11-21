import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config()

export const pg = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DB_CONNECTION_STRING
    }
});