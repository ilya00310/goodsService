import knex from 'knex'
import fp from 'fastify-plugin'
import dotenv from 'dotenv';
dotenv.config();
export default fp(
    function fastifyKnex(fastify, options, next) {
        if (!fastify.knex) {
            const connection = knex({
                client: 'pg',
                connection: {
                    connectionString: process.env.DB_CONNECTION_STRING_HISTORY,
                },
            })
            fastify.decorate('knex', connection)
        }
        next()
    },
    {
        name: 'knex',
    },
)