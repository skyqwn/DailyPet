import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const requset = ctx.switchToHttp().getRequest();

  return requset.user;
});
