import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('monthly_single_credit_cards')
class MonthlyCreditCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_monthly: string;

  @Column()
  flag: string;

  @Column()
  last_digits: string;

  @Column()
  payment_profile: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default MonthlyCreditCard;
