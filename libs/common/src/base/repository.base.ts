import { BaseEntity } from '@app/common/base/entity.base';
import {
  BaseRepositoryInterface,
  FindAllResponse,
} from '@app/common/interfaces/base-repository.interface';
import {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export abstract class BaseRepository<T extends BaseEntity>
  implements BaseRepositoryInterface<T>
{
  protected constructor(private readonly model: Model<T>) {
    this.model = model;
  }

  async create(data: T): Promise<T> {
    const createdModel = new this.model(data);
    return createdModel.save();
  }

  async findAll(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T[]> {
    return this.model.find(filter, projection, options).exec();
  }

  async findAllAndCount(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<FindAllResponse<T>> {
    const [items, total] = await Promise.all([
      this.model.find(filter, projection, options).exec(),
      this.model.countDocuments(filter).exec(),
    ]);

    return { items, total };
  }

  async findOne(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T> {
    const item = (await this.model
      .findOne(filter, projection, options)
      .lean()
      .exec()) as T;

    return item?.deletedAt ? null : item;
  }

  async findOneById(id: string): Promise<T> {
    const item = (await this.model.findById(id).lean().exec()) as T;
    return item?.deletedAt ? null : item;
  }

  async updateById(
    id?: any,
    update?: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T> {
    const item = (await this.model
      .findByIdAndUpdate(id, update, { new: true, ...options })
      .lean()
      .exec()) as T;

    return item;
  }

  async updateOne(
    filter?: FilterQuery<T>,
    update?: UpdateQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T> {
    const item = (await this.model
      .findOneAndUpdate(filter, update, options)
      .lean()
      .exec()) as T;
    return item;
  }

  async remove(id: string): Promise<T> {
    return (await this.model.findByIdAndDelete(id).lean().exec()) as T;
  }

  async removeMany(
    filter?: FilterQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<boolean> {
    const { deletedCount } = await this.model
      .deleteMany(filter, options)
      .exec();
    return deletedCount > 0;
  }

  async softRemove(id: string): Promise<T> {
    return (await this.model.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true },
    )) as T;
  }

  getMongoModel(): Model<T> {
    return this.model;
  }
}
