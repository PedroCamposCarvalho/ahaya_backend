import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('appointments_prices')
class AppointmentPrice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_sport: string;

  @Column()
  id_court: string;

  @Column()
  week_day: number;

  @Column()
  hour: number;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AppointmentPrice;
