import fastifyPlugin from 'fastify-plugin';
import pg from 'pg';

const { Client } = pg
export const pool = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
})
// экспортирую и оборачиваю  плагин, в котором подключаюсь к бд, используя для входа pool
export const db_connector = fastifyPlugin(async (fastify, options) => {
    try {
        await pool.connect()
        console.log("db connected succesfully")
        fastify.decorate('db', { pool })
    } catch (err) {
        console.error(err)
    }
})
