import health from '../health/health.js'

export function getNextServer(servers) {

    for (const server of servers) {
        const serverHealth = health.get(server.id);
        if (serverHealth && serverHealth.healthy) {
            return server;
        }
    }
    return null; // No healthy servers available
        
}