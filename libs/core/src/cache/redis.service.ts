import { Redis } from 'ioredis';
import { RedisConfig } from './redis.interface';

export class RedisService {
  private redis: Redis | null = null;

  constructor(config: RedisConfig) {
    if (config) {
      const { host, port, password } = config;
      this.redis = new Redis({
        host,
        port: +port,
        password,
      });

      this.redis.on('connect', () => {
        console.log('Redis connected');
      });

      this.redis.on('error', (error) => {
        console.log('Redis error', error);
      });

      this.redis.on('close', () => {
        console.log('Redis connection closed');
      });
    }
  }

  async get(key: string) {
    return this.redis!.get(key);
  }

  async set(key: string, value: string, expire?: number) {
    await this.redis!.set(key, value);
    if (expire) {
      await this.redis!.expire(key, expire);
    }

    return true;
  }

  async del(key: string) {
    return this.redis!.del(key);
  }
}
