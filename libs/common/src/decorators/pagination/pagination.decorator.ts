import { ApiQuery } from '@nestjs/swagger';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationOptions } from './pagination.model';
import { SORT_ORDER } from '@app/common/enums';

export const Pagination = createParamDecorator(
  (_data: unknown, context: ExecutionContext): PaginationOptions => {
    const request = context.switchToHttp().getRequest();
    // Whatever logic you want to parse params in request
    const page = parseInt(request.query.page, 10) || 1;
    const limit = parseInt(request.query.limit, 10) || 20;
    const sortKey = request.query.sortKey;
    const sortOrder = request.query.sortOrder;

    return {
      limit: limit,
      skip: (page - 1) * limit,
      page,
      sortKey,
      sortOrder,
    };
  },
  [
    (target: Object, propertyKey?: string | symbol) => {
      const propertyDescriptor: PropertyDescriptor | undefined =
        Object.getOwnPropertyDescriptor(target, propertyKey!);

      if (!propertyDescriptor || !propertyKey) return;

      ApiQuery({
        name: 'page',
        schema: { default: 1, type: 'number', minimum: 1 },
        required: false,
      })(target, propertyKey, propertyDescriptor);
      ApiQuery({
        name: 'limit',
        schema: { default: 20, type: 'number', minimum: 1 },
        required: false,
      })(target, propertyKey, propertyDescriptor);
      ApiQuery({
        name: 'sortKey',
        schema: { type: 'string' },
        required: false,
      })(target, propertyKey, propertyDescriptor);
      ApiQuery({
        name: 'sortOrder',
        schema: { type: 'string' },
        enum: SORT_ORDER,
        required: false,
      })(target, propertyKey, propertyDescriptor);
    },
  ],
);
