import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('packages_history')
class PackagesHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_payer: string;

  @Column()
  amount: number;

  @Column()
  use_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PackagesHistory;
