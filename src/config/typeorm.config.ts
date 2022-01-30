/* eslint-disable */
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const TypeOrmConfig: TypeOrmModuleOptions = { 
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'tasktracker',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true
}