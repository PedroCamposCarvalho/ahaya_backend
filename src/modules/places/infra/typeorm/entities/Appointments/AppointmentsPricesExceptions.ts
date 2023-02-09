import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('appointments_prices_exceptions')
class AppointmentsPricesExceptions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_appointment_price: string;

  @Column()
  date: Date;

  @Column()
  new_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AppointmentsPricesExceptions;
