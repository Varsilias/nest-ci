/* eslint-disable */

import { DataFactory, Seeder } from 'nestjs-seeder'
import { InjectRepository } from '@nestjs/typeorm'
// import { TasksRepository } from '../repository/task.repository';
import { Task } from '../entities/task.entity'
import { Repository } from 'typeorm';

export class TaskSeeder implements Seeder {

    constructor(
        @InjectRepository(Task) 
        private tasksRepository: Repository<Task>
    ) {}

    drop(): Promise<any> {
        return this.tasksRepository.delete({});
    }

    seed(): Promise<any> {
        const tasks = DataFactory.createForClass(Task).generate(50);
        return this.tasksRepository.insert(tasks);
    }
}