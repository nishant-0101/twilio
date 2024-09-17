// src/entities/ViswaOpsNumber.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ViswaOpsNumber {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  phoneNumber!: string;
  
  @Column()
  name: string;
}
