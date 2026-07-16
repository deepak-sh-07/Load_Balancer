import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
const app = express()
const PORT = 3000

app.use(express.json())
const servers = [
    "http://localhost:5001",
    "http://localhost:5002",
    "http://localhost:5003"
];

let current = 0;

function getNextServer() {
    const server = servers[current];
    current = (current + 1) % servers.length;
    return server;
}

app.use((req, res, next) => {
    const target = getNextServer();

    createProxyMiddleware({
        target,
        changeOrigin: true,
    })(req, res, next);
});

// const server1 = createProxyMiddleware({
//     target: "http://localhost:5001",
//     changeOrigin: true,
// })
// const server3 = createProxyMiddleware({
//     target: "http://localhost:5001",
//     changeOrigin: true,
// })
// const server3 = createProxyMiddleware({
//     target: "http://localhost:5003",
//     changeOrigin: true,
// })
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
})
