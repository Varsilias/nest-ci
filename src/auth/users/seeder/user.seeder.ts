/* eslint-disable */

import { DataFactory, Seeder } from 'nestjs-seeder'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity'

export class UserSeeder implements Seeder {

    constructor(
        @InjectRepository(UserRepository) 
        private userRepository: UserRepository
    ) {}

    drop(): Promise<any> {
        return this.userRepository.delete({});
    }

    seed(): Promise<any> {
        const users = DataFactory.createForClass(User).generate(5);
        return this.userRepository.insert(users);
    }
}