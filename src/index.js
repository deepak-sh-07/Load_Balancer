import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { getNextServer } from './algorithms/roundRobin'
const app = express()
const PORT = 3000
import config from "../config.json" assert { type: "json" };
const servers = config.servers;

app.use(express.json())

app.use((req, res, next) => {
    createProxyMiddleware({
    router: () => getNextServer(servers),
    changeOrigin: true,
    });
    
});

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
})
