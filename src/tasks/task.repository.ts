/* eslint-disable */

import { retry } from "rxjs";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-task-filter.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./types/task-status.type";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {

  async getTask(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto
    const query = this.createQueryBuilder('task')

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })
    }
    const tasks = query.getMany()
    return tasks
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN
    await task.save();

    return task;
  }
}