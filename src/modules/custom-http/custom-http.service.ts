import { Injectable, Logger } from '@nestjs/common';
import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from 'axios';

@Injectable()
export class CustomHttpService {
  private axios: AxiosInstance;

  constructor(configs: CreateAxiosDefaults) {
    this.axios = Axios.create(configs);
    this.interceptors();
  }

  private readonly logger = new Logger(CustomHttpService.name);

  async get<T>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig<any>,
  ): Promise<T> {
    const res: AxiosResponse<T> = await this.axios.get(url, {
      params,
      ...config,
    });
    return res.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>,
  ): Promise<T> {
    const res: AxiosResponse<T> = await this.axios.post(url, data, config);
    return res.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any>,
  ): Promise<T> {
    const res: AxiosResponse<T> = await this.axios.put(url, data, config);
    return res.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig<any>): Promise<T> {
    const res: AxiosResponse<T> = await this.axios.delete(url, config);
    return res.data;
  }

  private interceptors() {
    this.axios.interceptors.request.use(
      (config) => {
        // Todo
        return config;
      },
      (error) => {
        this.logger.error(`Request: ${error.message}`);
        return Promise.reject(error);
      },
    );

    this.axios.interceptors.response.use(
      (response) => {
        this.logger.debug(
          `Response: ${response.config.url} -> ${response.status}`,
        );
        return response;
      },
      (error) => {
        this.logger.error(`Response: ${error.message}`);
        return Promise.reject(error);
      },
    );
  }
}
