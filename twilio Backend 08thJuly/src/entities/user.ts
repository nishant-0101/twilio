import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true })
  phoneNumber!: string;

  @Column({ type: 'varchar' })
  firstName!: string;

  @Column({ type: 'varchar' })
  lastName!: string;

  @Column({ type: 'varchar' })
  userType!: string; // 'client' | 'agent' | 'ops' | 'surveyor'

  @Column({ type: 'varchar', nullable: true })
  email?: string; // Optional email field

  @Column({ nullable: true })
  refreshToken: string; 
}
