// metrics.js

const metrics = new Map();

export function initializeMetrics(servers){
    for (const server of servers) {
        metrics.set(server.id, {
            totalRequests: 0,
            successfulRequests: 0,
            failedRequests: 0,
            totalResponseTime: 0
        });
    }
}

export default metrics;