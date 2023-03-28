import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomersService } from '../../services/customers/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../../dtos/customers';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators';

@ApiTags('Customers')
@Auth()
@ApiBearerAuth()
@Controller()
export class CustomersController {

  constructor(private readonly customersService: CustomersService) { }

  /**
   * Create new customer
   * @param createCustomerDto 
   * @returns 
   */
  @Post('customer')
  @ApiOperation({ summary: 'Create new customer' })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customersService.create(createCustomerDto)
  }

  /**
   * Get list of all customers
   * @returns 
   */
  @Get('customers')
  @ApiOperation({ summary: 'Get list of all customers' })
  async findAll() {
    return await this.customersService.findAll();
  }

  /**
   * Get customer by customer id
   * @param id 
   * @returns 
   */
  @Get('customer/:id')
  @ApiOperation({ summary: 'Get customer by customer id' })
  async findOne(@Param('id') id: string) {
    return await this.customersService.findOne(+id);
  }

  /**
   * Update customer data submitted by customer id
   * @param id 
   * @param updateCustomerDto 
   * @returns 
   */
  @Patch('customer/:id')
  @ApiOperation({ summary: 'Update customer data submitted by customer id' })
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return await this.customersService.update(+id, updateCustomerDto);
  }

  /**
   * Delete customer by customer id
   * @param id
   */
  @Delete('customer/:id')
  @ApiOperation({ summary: 'Delete customer by customer id' })
  async remove(@Param('id') id: string) {
    await this.customersService.remove(+id);
  }
}