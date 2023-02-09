import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('monthly')
class Monthly {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_court: string;

  @Column()
  id_user: string;

  @Column()
  week_day: number;

  @Column()
  hour: number;

  @Column()
  price: number;

  @Column()
  sandbox_product: number;

  @Column()
  production_product: number;

  @Column()
  renew_date: Date;

  @CreateDateColumn()
  start_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Monthly;
