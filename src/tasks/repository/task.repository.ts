/* eslint-disable */

import { InternalServerErrorException, Logger } from "@nestjs/common";
import { User } from "src/auth/users/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "../dto/create-task.dto";
import { GetTasksFilterDto } from "../dto/get-task-filter.dto";
import { Task } from "../entities/task.entity";
import { TaskStatus } from "../types/task-status.type";
// import { QueryFailedError } from 'typeorm'
@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  private logger = new Logger('TasksRepository')

  async getTask(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto
    const query = this.createQueryBuilder('task')

    query.where('task.userId = :userId', { userId: user.id })

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })
    }

    try {
      const tasks = await query.getMany();
      return tasks
    } catch (error) {        
      this.logger.error(`failed to get Task for user ${user.username}, Data: ${JSON.stringify(filterDto)}`, error.stack)
      throw new InternalServerErrorException();
      
    }
    
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN
    task.user = user

    try {
      await task.save()
    } catch (error) {
      this.logger.error(`failed to Create Task for user ${user.username}, Data: ${JSON.stringify(createTaskDto)}`, error.stack)
      throw new InternalServerErrorException();
    }
    
    delete task.user;

    return task;
  }
}