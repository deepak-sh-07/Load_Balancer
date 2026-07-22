import health from "./health.js";
async function heathcheck(servers) {
    await Promise.all( // i used promise here beacuse if used loop and await it will then delay the res but now all the req are sent instantly and got the result faster 
    servers.map(async (server) => {
        const status = health.get(server.id);
        try {
            const response = await fetch(`${server.url}/health`);
            status.healthy = response.ok;
            status.lastChecked = Date.now();
        } catch {
            status.healthy = false;
            status.lastChecked = Date.now();
        }
    })
);

}
export async function healthChecker(servers) {
    await heathcheck(servers); // one health check at the start of the server
    setInterval(async () => {
        await heathcheck(servers); // then after 5 seconds
    }, 5000);
}
