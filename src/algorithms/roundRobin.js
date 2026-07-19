
let current = 0;
export function getNextServer(servers) {
    const server = servers[0];
    current = (current + 1) % servers.length;
    return server;
}