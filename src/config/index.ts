/* eslint-disable */
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import 'dotenv/config';


export const JwtConfigOptions = {
  secret: process.env.JWT_SECRET ||'secret-from-env',
  signOptions: {
    expiresIn: parseInt(process.env.JWT_EXPIRY)
  }
}


export const PassportConfigOptions = {
  defaultStrategy: 'jwt'
}

export const TypeOrmConfigOptions: TypeOrmModuleOptions = { 
  type:process.env.DB_TYPE as 'postgres' || 'postgres',
  host:process.env.RDS_HOSTNAME ||process.env.DB_HOST || 'localhost',
  port: process.env.RDS_PORT as unknown as number|| parseInt(process.env.DB_PORT) ||5432,
  username: process.env.RDS_USERNAME || process.env.DB_USERNAME ||'postgres',
  password: process.env.RDS_PASSWORD || process.env.DB_PASSWORD ||'password',
  database: process.env.RDS_DB_NAME || process.env.DB_DATABASE ||'tasktracker',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.TYPEORM_SYNC as unknown as boolean || !!process.env.DB_SYNC,
  url: process.env.DATABASE_URL,
  ssl: {
      rejectUnauthorized: false,
   }
}