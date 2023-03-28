import { Module } from '@nestjs/common';
import { InvoicesService } from '../services/invoices/invoices.service';
import { InvoicesController } from '../controllers/invoices/invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoices } from 'src/entities/invoice.entity';
import { Items } from 'src/entities/items.entity';
import { UsersModule } from './users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Invoices]), TypeOrmModule.forFeature([Items]), UsersModule],
  controllers: [InvoicesController],
  providers: [InvoicesService]
})
export class InvoicesModule {}
