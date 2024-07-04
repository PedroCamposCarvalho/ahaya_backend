import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('events_users')
class EventUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_event: string;

  @Column()
  id_user: string;

  @Column()
  paid: boolean;

  @Column()
  observation: string;

  @Column()
  paid_price: number;

  @Column()
  id_transaction: string;

  @Column()
  material_amount: number;

  @Column()
  ticket_number: number;

  @Column()
  retrieved: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventUser;
