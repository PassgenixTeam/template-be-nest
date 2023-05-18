export interface Response<T> {
  data: T;
  statusCode: number;
  message: string;
}

export interface ResPagination<T> {
  metadata: T[];
  meta: {
    page: number;
    take: number;
    totalItems: number;
    totalPages: number;
    itemCount: number;
  };
}
