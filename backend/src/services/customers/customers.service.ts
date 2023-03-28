import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from 'src/entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from '../../dtos/customers';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customers)
    private customersRepository: Repository<Customers>
  ) { }

  /**
   * Create the new customer
   * @param createCustomerDto 
   * @returns 
   */
  async create(createCustomerDto: CreateCustomerDto) {
    return await this.customersRepository.save(createCustomerDto)
  }

  /**
   * Get customer list
   * @returns 
   */
  findAll(): Promise<Customers[]> {
    return this.customersRepository
      .createQueryBuilder('cus')
      .leftJoinAndSelect('cus.invoices', 'invs')
      .leftJoinAndSelect('invs.items', 'itm')
      .orderBy('cus.createdAt', 'DESC')
      .getMany();
  }

  /**
   * Gets the customer by id, if the customer is not found it returns the error
   * @param id 
   * @returns 
   */
  async findOne(id: number): Promise<Customers> {
    const customer = await this.customersRepository.findOneBy({ cusId: id })
    if (!customer) throw new NotFoundException(`Customer with customer id "${id}" not found`)
    return customer
  }

  /**
   * Update the customer with the data provided and check if the customer exists, if not, show the error
   * @param id 
   * @param updateCustomerDto 
   * @returns 
   */
  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      const customer = await this.customersRepository.preload({ cusId: id, ...updateCustomerDto })
      if (!customer) throw new NotFoundException(`Customer with customer id ${id} not found`)
      await this.customersRepository.save(customer)
      return customer
    } catch (error) {
      throw new NotFoundException(`Customer with customer id "${id}" not found`)
    }
  }

  /**
   * Delete the customer and check if it exists, if it doesn't it returns the error
   * @param id 
   */
  async remove(id: number) {
    try {
      if (await this.findOne(id)) await this.customersRepository.delete(id)
    } catch (error) {
      if (error.errno === 1451) throw new BadRequestException(`This client is related to one or more invoices, please delete those invoices before deleting the client.`)
      throw new InternalServerErrorException(`Can't create User - Check server logs`)
    }
  }
}