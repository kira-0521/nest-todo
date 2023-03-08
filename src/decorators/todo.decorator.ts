import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetTodoId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.params.id as string;
  },
);
