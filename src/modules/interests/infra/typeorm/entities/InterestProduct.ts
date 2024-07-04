import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('interests_products')
class InterestProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_interest: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default InterestProduct;
