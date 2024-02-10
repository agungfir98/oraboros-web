import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthUser } from '@supabase/supabase-js';

export const User = createParamDecorator((_, ctx: ExecutionContext) => {
  const req: { user: AuthUser } = ctx.switchToHttp().getRequest();

  return req.user;
});
