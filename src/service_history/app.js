import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import autoload from '@fastify/autoload'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default async function (
    fastify,
    opts,
) {
    await fastify.register(autoload, {
        dir: join(__dirname, '.', 'plugins'),
        dirNameRoutePrefix: false,
        ignorePattern: /.*.no-load\.js/,
        indexPattern: /^no$/i,
        options: Object.assign({}, opts),
    })
}