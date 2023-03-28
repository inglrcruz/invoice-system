import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoices } from 'src/entities/invoice.entity';
import { Items } from 'src/entities/items.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../../dtos/invoices';

@Injectable()
export class InvoicesService {

  constructor(
    @InjectRepository(Invoices) private invoicesRepository: Repository<Invoices>,
    @InjectRepository(Items) private itemsRepository: Repository<Items>
  ) { }

  /**
   * Create the new invoice
   * @param createInvoiceDto 
   * @returns 
   */
  async create(createInvoiceDto: CreateInvoiceDto) {
    const inv = await this.invoicesRepository.save(createInvoiceDto)
    if (!inv) throw new InternalServerErrorException(`Can't create invoice - Check server logs`)
    const items: any = createInvoiceDto.items.map(item => ({ ...item, invId: inv.invId }))
    await this.itemsRepository.save(items)
    return inv
  }

  /**
   * Get user list
   * @returns
   */
  findAll(): Promise<Invoices[]> {
    return this.invoicesRepository
      .createQueryBuilder('inv')
      .innerJoinAndSelect('inv.cusId', 'cus')
      .innerJoinAndSelect('inv.items', 'itm')
      .orderBy('inv.createdAt', 'DESC')
      .getMany()
  }

  /**
   * Gets the user by id, if the user is not found it returns the error
   * @param id 
   * @returns 
   */
  async findOne(id: number): Promise<Invoices> {
    const user = await this.invoicesRepository
      .createQueryBuilder('inv')
      .innerJoinAndSelect('inv.cusId', 'cus')
      .innerJoinAndSelect('inv.items', 'itm')
      .where({ invId: id })
      .getOne()
    if (!user) throw new NotFoundException(`User with user id "${id}" not found`)
    return user
  }

  /**
   * Update the username with the data provided and check if the username exists, if not, show the error
   * @param id 
   * @param updateUserDto 
   * @returns 
   */
  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    try {
      const user = await this.invoicesRepository.preload({ invId: id, ...updateInvoiceDto })
      if (!user) throw new NotFoundException(`User with user id ${id} not found`)
      await this.invoicesRepository.save(user)
      const items: any = updateInvoiceDto.items.map(item => ({ ...item, invId: id }))
      await this.itemsRepository.save(items)
      if (updateInvoiceDto.itemsDelete) await this.itemsRepository.createQueryBuilder().delete().where(updateInvoiceDto.itemsDelete)
      return user
    } catch (error) {
      throw new NotFoundException(`User with user id "${id}" not found`)
    }
  }

  /**
   * Delete the user and check if it exists, if it doesn't it returns the error
   * @param id
   */
  async remove(id: number) {
    const inv = await this.findOne(id)
    if (inv) {
      for (const item of inv.items) {
        await this.itemsRepository.delete(item.itmId)
      }
      await this.invoicesRepository.delete(id)
    }
  }
}