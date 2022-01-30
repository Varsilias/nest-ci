/* eslint-disable */

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "../auth/users/entities/user.entity";

export const GetUser = createParamDecorator((data: any, ctx: ExecutionContext): User => {
  const user = ctx.switchToHttp().getRequest().user
  return user ? user : null
})