import knex from 'knex';
// конфигурация knex
export const pg = knex({
    client: 'pg',
    connection: process.env.DB_CONNECTION_STRING,
});