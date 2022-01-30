/* eslint-disable */

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Generated } from "typeorm";
import { TaskStatus } from './types/task-status.type';

@Entity()
export class Task extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  @Generated('uuid')
  publicId: string;

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: TaskStatus
}