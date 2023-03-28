import { Injectable } from '@nestjs/common';
import { appConfig } from '../config';
import { Redis } from 'ioredis';
import { RedisConfig } from './redis.interface';

export class RedisService {
  private redis: Redis;

  // static init() {
  //   const {
  //     REDIS_HOST: host,
  //     REDIS_PORT: port,
  //     REDIS_PASSWORD: password,
  //   } = appConfig.redis;
  //   const redis = new Redis({
  //     host,
  //     port: +port,
  //     password,
  //   });

  //   redis.on('connect', () => {
  //     console.log('Redis connected');
  //   });

  //   redis.on('error', (error) => {
  //     console.log('Redis error', error);
  //   });

  //   redis.on('close', () => {
  //     console.log('Redis connection closed');
  //   });

  //   this.redis = redis;
  // }

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
    return this.redis.get(key);
  }

  async set(key: string, value: string, expire?: number) {
    await this.redis.set(key, value);
    if (expire) {
      await this.redis.expire(key, expire);
    }

    return true;
  }

  async del(key: string) {
    return this.redis.del(key);
  }
}
