export interface FindAllResponse<T> {
  items: T[];
  total: number;
}

export interface BaseRepositoryInterface<T> {
  create(data: T): Promise<T>;
  findAll(
    conditions?: Record<string, unknown>,
    projection?: Record<string, unknown>,
  ): Promise<FindAllResponse<T>>;

  findOne(
    conditions?: Record<string, unknown>,
    projection?: Record<string, unknown>,
  ): Promise<T>;

  findOneById(id: string): Promise<T>;

  updateById(id: string, data: T): Promise<T>;

  updateOne(
    conditions: Record<string, unknown>,
    data: Record<string, unknown>,
  ): Promise<T>;

  remove(id: string): Promise<T>;

  softRemove(id: string): Promise<T>;
}
