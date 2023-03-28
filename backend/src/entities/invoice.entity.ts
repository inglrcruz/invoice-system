import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Customers } from './customer.entity'
import { Items } from './items.entity';
import { StatusFormat } from '../enums/invoices';

@Entity()
export class Invoices {

    @PrimaryGeneratedColumn()
    invId: number;

    @ManyToOne(() => Customers, (cust) => cust.cusId)
    @JoinColumn({ name: 'cusId' })
    cusId: Customers;

    @Column()
    subTotal: Number;

    @Column()
    itbis: Number;

    @Column()
    total: Number;

    @Column({ default: "" })
    note?: string;

    @Column({ type: 'enum', enum: StatusFormat, default: StatusFormat.open })
    status?: StatusFormat

    @Column({ type: 'datetime', default: () => 'NOW()' })
    createdAt: Date;

    @OneToMany(() => Items, (item) => item.invId)
    items: Items[];
}