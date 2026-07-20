import health from "./health.js";
async function heathcheck(servers) {
    for (const server of servers){
        const status = health.get(server.id);
    try {
        const response = await fetch(`${server.url}/health`);
        status.healthy = response.ok;
        status.lastChecked = Date.now();
    } catch {
        status.healthy = false;
        status.lastChecked = Date.now();
        }
        console.log(`Health check for server ${server.id}: ${status.healthy ? "healthy" : "unhealthy"} \n`);
}
}
export async function healthChecker(servers) {
    await heathcheck(servers); // one health check at the start of the server
    setInterval(async () => {
        await heathcheck(servers); // then after 5 seconds
    }, 5000);
}
