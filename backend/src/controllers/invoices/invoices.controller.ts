import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../../dtos/invoices';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InvoicesService } from 'src/services/invoices/invoices.service';
import { Auth } from 'src/decorators';

@ApiTags('Invoices')
@Auth()
@ApiBearerAuth()
@Controller()
export class InvoicesController {

  constructor(private readonly invoicesService: InvoicesService) { }

  /**
   * Create invoice
   * @param createInvoiceDto 
   * @returns 
   */
  @Post('invoice')
  @ApiOperation({ summary: 'Create new invoice' })
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return await this.invoicesService.create(createInvoiceDto)
  }

  /**
   * Get list of all invoices
   * @returns 
   */
  @Get('invoices')
  @ApiOperation({ summary: 'Get list of all invoices' })
  async findAll() {
    return await this.invoicesService.findAll();
  }

  /**
   * Get invoice by invoice id
   * @param id 
   * @returns 
   */
  @Get('invoice/:id')
  @ApiOperation({ summary: 'Get invoice by invoice id' })
  async findOne(@Param('id') id: string) {
    return await this.invoicesService.findOne(+id);
  }

  /**
   * Update invoice data submitted by invoice id
   * @param id 
   * @param updateInvoiceDto 
   * @returns 
   */
  @Patch('invoice/:id')
  @ApiOperation({ summary: 'Update invoice data submitted by invoice id' })
  async update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return await this.invoicesService.update(+id, updateInvoiceDto);
  }

  /**
   * Delete invoice by invoice id
   * @param id
   */
  @Delete('invoice/:id')
  @ApiOperation({ summary: 'Delete invoice by invoice id' })
  async remove(@Param('id') id: string) {
    await this.invoicesService.remove(+id);
  }

}