import fastifyPlugin from 'fastify-plugin';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg
export const pool = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
})

export const db_connector = fastifyPlugin(async (fastify, options) => {
    try {
        await pool.connect()
        console.log("db connected successfully")
        fastify.decorate('db', { pool });
        fastify.addHook('onClose', async (instance, done) => {
            await instance.db.pool.end();
            done();
        })
    } catch (err) {
        console.error(err)
    }
})