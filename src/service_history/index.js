import fastify from 'fastify'
import App from './app.js'
import { db_connector } from './config/db.js'
import { routes } from './routes/index.js'

const app = fastify({
    logger: true
});

app.register(db_connector)
app.register(routes)
async function start() {

    await app.register(App)
    const port = 8080
    await app.listen({
        host: '0.0.0.0',
        port,
    }, () => {
        console.log(`server started on port ${port}`)
    })
}

start().catch(err => {
    console.error(err)
    process.exit(1)
})