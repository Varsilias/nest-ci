/* eslint-disable */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtConfigOptions } from "../../config";
import { JwtPayload } from "../types";
import { User } from "../users/entities/user.entity";
import { UserRepository } from "../users/repositories/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || JwtConfigOptions.secret,
      ignoreExpiration: false
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload
    const user = this.userRepository.findOne({ username })
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}