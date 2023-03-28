import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './models/users.module';
import { CustomersModule } from './models/customers.module';
import { InvoicesModule } from './models/invoices.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    autoLoadEntities: true,
    synchronize: true
  }),
    UsersModule, CustomersModule, InvoicesModule, SeedModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
