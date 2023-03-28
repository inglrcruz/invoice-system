import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Invoices } from './invoice.entity';

@Entity()
export class Customers {

    @PrimaryGeneratedColumn()
    cusId: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    address1: string;

    @Column({ default: "" })
    address2?: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    zip: number;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'datetime', default: () => 'NOW()' })
    createdAt: Date;

    @OneToMany(() => Invoices, (invs) => invs.cusId)
    invoices: Invoices[];
}