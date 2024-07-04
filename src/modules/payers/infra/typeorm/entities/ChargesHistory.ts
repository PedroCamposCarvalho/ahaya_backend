import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('charges_history')
class ChargesHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_user: string;

  @Column()
  paid_date: Date;

  @Column()
  paid_price: number;

  @Column()
  id_transaction: string;

  @Column()
  reversed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ChargesHistory;
