import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    usrId: number;

    @Column({ type: String })
    name: string;

    @Column({ type: String, unique: true })
    username: string;

    @Column({ type: String })
    password: string;

    @Column({ type: Boolean, default: true })
    isActive: boolean;

    @Column({ type: 'datetime', default: () => 'NOW()' })
    createdAt: Date;
}