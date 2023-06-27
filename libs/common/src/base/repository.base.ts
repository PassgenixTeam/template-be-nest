import { BaseEntity } from '@app/common/base/entity.base';
import {
  BaseRepositoryInterface,
  FindAllResponse,
} from '@app/common/interfaces/base-repository.interface';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';

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
    conditions?: Record<string, unknown>,
    projection?: Record<string, unknown>,
  ): Promise<T> {
    const item = await this.model.findOne(conditions, projection).exec();
    return item.deletedAt ? null : item;
  }

  async findOneById(id: string): Promise<T> {
    const item = await this.model.findById(id).exec();
    return item.deletedAt ? null : item;
  }

  async updateById(id: string, data: T): Promise<T> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async updateOne(
    conditions: Record<string, unknown>,
    data: Record<string, unknown>,
  ): Promise<T> {
    return this.model.findOneAndUpdate(conditions, data).exec();
  }

  async remove(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id).exec();
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
    return this.model.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true },
    );
  }
}
