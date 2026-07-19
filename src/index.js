import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { getNextServer } from './algorithms/roundRobin.js'
import { rateLimiter } from './rate_limiter/rateLimiter.js'
import { Logger } from './middleware/logger.js'
import metrics, { initializeMetrics } from "./metrics/metrics.js";
const app = express()
const PORT = 3000
import config from "../config.json" with { type: "json" };
const servers = config.servers;
initializeMetrics(servers) // initialized a map 
// console.log(servers)
app.use(express.json())

app.use(Logger)
app.use(rateLimiter)
const proxy = createProxyMiddleware({
    router: (req) => req.backend.url,
    changeOrigin: true,
});



app.use((req, res, next) => {
    console.log("Setting Backend")
    
    req.backend = getNextServer(servers); /// implementing this so that any other middleware using the req can know which backend we have used 
    if (!req.backend) {
        return res.status(503).json({ error: "No backend available" });
    }
    const data = metrics.get(req.backend.id);
    // console.log(data);
    data.totalRequests++;
    next();
});

app.use(proxy);


app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
})
