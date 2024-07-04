import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('monthly_user_missed_days')
class MonthlyUserMissedDays {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_monthly: string;

  @Column()
  date: Date;
}

export default MonthlyUserMissedDays;
