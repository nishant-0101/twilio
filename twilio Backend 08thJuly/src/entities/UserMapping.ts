import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserMapping {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  phoneNumber!: string;

  @Column()
  bqsUserId!: string; // This is the unique identifier for BQS mobile app user

  @Column()
  nominationId!: string; // To link a particular job/nomination
}