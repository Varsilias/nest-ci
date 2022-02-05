/* eslint-disable */

import { BaseEntity, Entity, PrimaryGeneratedColumn, Generated, Column, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Task } from "../../../tasks/entities/task.entity";

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  @Generated('uuid')
  publicId: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(type => Task, task => task.user, { eager: true, cascade: true })
  tasks: Task[]


  async valiadatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password
  }
}