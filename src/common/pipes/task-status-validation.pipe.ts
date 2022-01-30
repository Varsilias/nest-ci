/* eslint-disable */

import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { TaskStatus } from '../../tasks/types/task-status.type';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {

  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ]

  transform(value: any) {
    value = value.toUpperCase()
    return this.checkStatus(value)

  }

  private checkStatus(status: any) {
    if (!this.allowedStatuses.includes(status)) {
      throw new BadRequestException(`${status} is not an allowed value, only OPEN, IN_PROGRESS, DONE are allowed`)
    }

    return status
  }
}