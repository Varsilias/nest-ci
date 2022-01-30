/* eslint-disable */

import { SignUpDto, SignInDto } from "../../dto";
import { DUPLICATE_FIELD_ERROR_CODE } from "../../types";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcryt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  
  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { password } = signUpDto
    const salt = await this.generateSalt()
    const hash = await this.hashPassword(password, salt)
    const user = this.create({...signUpDto, password: hash, salt })

    try {
      await user.save();
    } catch (error) {
      if(error.code === DUPLICATE_FIELD_ERROR_CODE) { // Duplicate Username or email error
        throw new ConflictException("Username or Email already in use");
      } else {
        throw new InternalServerErrorException();
        
      }
    }
  }

  async validateUserPassword(signInDto: SignInDto): Promise<string | null> {
    const { username, password } = signInDto
    const user = await this.findOne({ username })

    // Check if there is a user -------- the "ValidatePassword" method is inside the "User" Entitty File
    if (user && await user.valiadatePassword(password)) { 
      return user.username
    }

    return null
  }

  private async generateSalt(): Promise<string> {
    return await bcryt.genSalt()
  }

  private async hashPassword(plainTextPassword: string, salt: string): Promise<string> {
    return await bcryt.hash(plainTextPassword, salt)
  }
}