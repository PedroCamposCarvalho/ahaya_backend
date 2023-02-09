import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_court: string;

  @Column()
  id_place: string;

  @Column()
  price: number;

  @Column('timestamp with time zone')
  start_date: Date;

  @Column('timestamp with time zone')
  finish_date: Date;

  @Column()
  canceled: boolean;

  @Column()
  created_sequence: boolean;

  @Column()
  id_transaction: string;

  @Column()
  observation: string;

  @Column()
  number_of_players: number;

  @Column()
  paid: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
