import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SurveyorMaster } from './SurveyorMaster';

@Entity()
export class NominationDetails {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nominationId!: string;

  @Column({ type: 'varchar' })
  surveyorIdentity!: string;

  @Column({ type: 'varchar' })
  clientIdentity!: string;

  @Column({ type: 'varchar' })
  agentIdentity?: string; 

  @Column({ type: 'json' })
  details!: object;

  @Column()
  status!: string;

  // @ManyToOne(() => SurveyorMaster)
  // @JoinColumn({ name: 'surveyorId' })
  // surveyor!: SurveyorMaster;
}

