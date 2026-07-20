//will save all the health of the servers

const health = new Map();

export function initializeHealth(servers) {
    for (const server of servers) {
        health.set(server.id, {
            healthy: false,
            lastChecked: null,
            failures: 0
        });
    }
}
export default health;