import redisClient from '../utils/redis.mjs';
import dbClient from '../utils/db.mjs';

class AppController {
    static getStatus(req, res) {
        const status = {
            redis: redisClient.isAlive(),
            db: dbClient.isAlive(),
        };
        res.status(200).json(status);
    }

    static async getStats(req, res) {
        const stats = {
            users: await dbClient.nbUsers(),
            files: await dbClient.nbFiles(),
        };
        res.status(200).json(stats);
    }
}

export default AppController;