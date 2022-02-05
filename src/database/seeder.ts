/* eslint-disable */
import { seeder } from 'nestjs-seeder'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Task } from '../tasks/entities/task.entity';
import { User } from '../auth/users/entities/user.entity';
import { TaskSeeder } from '../tasks/seeder/tasks.seeder';
import { TypeOrmConfigOptions } from '../config';

seeder({
    imports: [
        TypeOrmModule.forRoot({
            ...TypeOrmConfigOptions,
            logging: false,
            entities: [ Task, User ],

        } as TypeOrmModuleOptions),
        
        TypeOrmModule.forFeature([Task, User])
    ]
}).run([TaskSeeder])