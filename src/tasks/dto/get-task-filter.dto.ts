/* eslint-disable */
import { TaskStatus } from '../types/task-status.type';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator'

export class GetTasksFilterDto {

  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}