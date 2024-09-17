// src/entities/Conversation.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  conversationSid!: string;

  @Column()
  nominationId!: string;
}