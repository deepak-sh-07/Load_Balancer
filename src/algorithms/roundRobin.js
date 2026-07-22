import health from "../health/health.js";
let current = 0;

export function getNextServer(servers) {
    const n = servers.length;

    for (let i = 0; i < n; i++) {
        const index = (current + i) % n;
        const server = servers[index];

        const serverHealth = health.get(server.id);

        if (serverHealth?.healthy) {
            current = (index + 1) % n;
            return server;
        }
    }

    return null;
}