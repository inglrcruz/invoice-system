import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Invoices } from './invoice.entity';

@Entity()
export class Items {

    @PrimaryGeneratedColumn()
    itmId: number;

    @ManyToOne(() => Invoices, (inv) => inv.items)
    @JoinColumn({ name: 'invId' })
    invId: Invoices;

    @Column()
    description: String;

    @Column()
    qty: Number;

    @Column()
    price: Number;

    @Column()
    total: Number;
}