/* eslint-disable */

import { User } from "../../auth/users/entities/user.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Generated, ManyToOne } from "typeorm";
import { TaskStatus } from '../types/task-status.type';
import { Factory } from "nestjs-seeder";
import { randomInt } from "crypto";

@Entity()
export class Task extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  @Generated('uuid')
  publicId: string;

  @Factory(faker => faker.lorem.words())
  @Column()
  title: string

  @Factory(faker => faker.lorem.sentence(20))
  @Column()
  description: string

  @Factory(() => TaskStatus.OPEN)
  @Column()
  status: TaskStatus

  @ManyToOne(type => User, user => user.tasks, { eager: false })
  user: User

  @Factory(() => randomInt(1, 6))
  @Column({ nullable: false })
  userId: number
}