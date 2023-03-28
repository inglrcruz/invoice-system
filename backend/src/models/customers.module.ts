import { Module } from '@nestjs/common';
import { CustomersService } from '../services/customers/customers.service';
import { CustomersController } from '../controllers/customers/customers.controller';
import { Customers } from 'src/entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customers]), UsersModule],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
