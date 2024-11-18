/**
 * Redis Client Module
 *
 * This module provides a simple wrapper around the Redis client, offering
 * methods to interact with a Redis database. It includes functionality to
 * check connection status, get, set, and delete keys with asynchronous support.
 */

import redis from ('redis');

class RedisClient {
    constructor() {
        this.client = redis.createClient(); 
        // Connect to Redis

        // Handle Redis client errors
        this.client.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });
    }

    /**
   * Check if the Redis client is connected
   * @returns {boolean} True if the client is connected, false otherwise
   */
    isAlive() {
        return this.client.connected;
        // Check if the client is connected
    }

      /**
   * Get the value of a key from Redis
   * @param {string} key - The key to retrieve from Redis
   * @returns {Promise<string|null>} A promise that resolves to the value of the key, or null if not found
   */
    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    console.error(`Failed to get value for key "${key}":`, err);
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });
    }

    /**
   * Set a key-value pair in Redis with an expiration time
   * @param {string} key - The key to set in Redis
   * @param {string} value - The value to set for the key
   * @param {number} duration - The expiration time in seconds
   * @returns {Promise<string>} A promise that resolves to the Redis response
   */
    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, 'EX', duration, (err) => {
                if (err) {
                    console.error(`Failed to set value for key "${key}":`, err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
   * Delete a key from Redis
   * @param {string} key - The key to delete from Redis
   * @returns {Promise<number>} A promise that resolves to the number of keys removed
   */
    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err) => {
                if (err) {
                    console.error(`Failed to delete key "${key}":`, err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

const redisClient = new RedisClient();
export default redisClient;
