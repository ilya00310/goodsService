import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();

export const pg = knex({
    client: 'pg',
    connection: process.env.DB_CONNECTION_STRING,
});