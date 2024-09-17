import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SurveyorMaster {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phoneNumber!: string;

  @Column({ type: 'varchar', length: 255 })
  userId!: string;
}
