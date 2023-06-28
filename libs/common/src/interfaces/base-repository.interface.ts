import {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export interface FindAllResponse<T> {
  items: T[];
  total: number;
}

export interface BaseRepositoryInterface<T> {
  create(data: T): Promise<T>;

  findAll(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T[]>;

  findAllAndCount(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<FindAllResponse<T>>;

  findOne(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T | null>;

  findOneById(id: string): Promise<T | null>;

  updateById(
    id?: any,
    update?: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T>;

  updateOne(
    filter?: FilterQuery<T>,
    update?: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T>;

  remove(id: string): Promise<T>;

  removeMany(
    filter?: FilterQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<boolean>;

  softRemove(id: string): Promise<T>;

  getMongoModel(): Model<T>;
}
