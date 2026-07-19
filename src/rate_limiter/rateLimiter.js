import Redis from 'ioredis' // in memory data store so not just for caching

const redis = new Redis();

export const rateLimiter = async (req, res, next) => {
    const key = `rate:${req.ip}`
    const limit = 5;
    const window = 60;

    const curr = await redis.incr(key);

    if (curr === 1) await redis.expire(key, window)
    const ttl = await redis.ttl(key);

    // console.log({
    //     curr,
    //     ttl
    // });

    if (curr > limit) {
        return res.status(429).json({ error: 'Too many requests' })
    }
    next();
}