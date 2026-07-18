let current = 0;

export function getNextServer(servers) {
    const server = servers[current];
    current = (current + 1) % servers.length;
    return server;
}