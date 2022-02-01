/* eslint-disable */

import { User } from "src/auth/users/entities/user.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Generated, ManyToOne } from "typeorm";
import { TaskStatus } from '../types/task-status.type';

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

  @ManyToOne(type => User, user => user.tasks, { eager: false })
  user: User

  @Column({ nullable: false })
  userId: number
}