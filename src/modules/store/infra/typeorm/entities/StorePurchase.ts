import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('store_purchases')
class StorePurchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_product: string;

  @Column()
  amount: number;

  @Column()
  price_paid: number;

  @Column()
  id_transaction: string;

  @Column()
  id_user: string;

  @Column()
  retrieved: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default StorePurchase;
