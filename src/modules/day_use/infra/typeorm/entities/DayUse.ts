import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('day_use')
class DayUse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column()
  limit: number;

  @Column()
  start_date: Date;

  @Column()
  finish_date: Date;

  @Column()
  special_thumbnail: string;

  @Column()
  id_place: string;

  @Column()
  special_image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default DayUse;
