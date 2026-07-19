import metrics from "../metrics/metrics.js"; // importing the common map to store all the metrics

export const Logger = async (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { // finish callback will execute after the req has been done 
        const responseTime = Date.now() - start;

        console.log(`[${new Date().toISOString()}]`);
        console.log(`${req.method} ${req.originalUrl}`);
        console.log(`Backend:${req.backend?.id ?? "Unknown"}`);
        console.log(`Status: ${res.statusCode}`);
        console.log(`Response Time: ${responseTime}ms`);
        console.log("----------------------------");

        if (req.backend) {
            const data = metrics.get(req.backend?.id);
            if (data) {
                data.totalResponseTime += responseTime;
                if (res.statusCode >= 200 && res.statusCode < 500) {
                    data.successfulRequests++;
                } else {
                    data.failedRequests++;
                }
            }
        }
    });

    next();

}