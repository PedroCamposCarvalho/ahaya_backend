import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sport_price')
class SportPrice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sport_id: string;

  @Column()
  monthly: number;

  @Column()
  weekend_monthly: number;

  @Column()
  regular: number;

  @Column()
  weekend_regular: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SportPrice;
