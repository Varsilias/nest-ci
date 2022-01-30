/* eslint-disable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './types/task-status.type';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TasksRepository)
    private readonly taskRepository: TasksRepository
    ) {}

    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
      return this.taskRepository.getTask(filterDto);
    }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id)
    
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }

    return found
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTaskById(id: number, status: TaskStatus): Promise<Task> {
    let task = await this.getTaskById(id);
    task.status = status;
    await task.save()
    return task
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }
  }
}
