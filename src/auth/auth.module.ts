/* eslint-disable */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtConfigOptions, PassportConfigOptions } from '../config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './users/repositories/user.repository';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [
    PassportModule.register(PassportConfigOptions),
    JwtModule.register(JwtConfigOptions),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [ JwtStrategy, PassportModule ]
})
export class AuthModule {}
