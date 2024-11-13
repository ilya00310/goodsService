import fastify from 'fastify';

const port = process.env.port || 3000;
const app = fastify();

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen({ port }, () => {
    console.log(`server started on port ${port}`)
})