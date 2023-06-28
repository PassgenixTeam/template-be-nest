export class PaginationOptions {
  public readonly limit!: number;
  public readonly skip!: number;
  public readonly page!: number;
  public readonly sortKey!: string;
  public readonly sortOrder!: 'ASC' | 'DESC';
}
