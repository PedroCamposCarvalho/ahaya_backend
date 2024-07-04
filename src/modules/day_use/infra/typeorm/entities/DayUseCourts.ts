import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('day_use_courts')
class DayUse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_dayuse: string;

  @Column()
  id_court: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default DayUse;
