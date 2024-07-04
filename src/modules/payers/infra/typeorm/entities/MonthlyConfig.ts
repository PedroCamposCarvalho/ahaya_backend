import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('monthly_config')
class PackagesConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hour: number;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PackagesConfig;
