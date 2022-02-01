/* eslint-disable */
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto, SignInDto } from "./dto";
import { JwtPayload } from './types';
import { UserRepository } from './users/repositories/user.repository';

@Injectable()
export class AuthService {
  logger = new Logger('AuthService')

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
    ){}

    async signUp(signUpDto: SignUpDto): Promise<void> {
      return this.userRepository.signUp(signUpDto)
    }

    async signIn(signInDto: SignInDto): Promise<{ accessToken: string}> {
      const username = await this.userRepository.validateUserPassword(signInDto)
      if (!username) {
        throw new UnauthorizedException("Invalid credentials provided");
      }

     const payload: JwtPayload = { username };
     const accessToken = this.generateAccessToken(payload)
     this.logger.debug(`Generated new JWT Token with payload: "${JSON.stringify(payload)}"`)
     return { accessToken }
      
    }

    private generateAccessToken(payload: any) {
      return this.jwtService.sign(payload)
    }
}
