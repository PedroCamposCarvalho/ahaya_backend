import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('vouchers')
class Voucher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_sport: string;

  @Column()
  percentage: number;

  @Column()
  id_user: string;

  @Column()
  pix_url: string;

  @Column()
  pix_key: string;

  @Column()
  paid: boolean;

  @Column()
  voucher_number: string;

  @Column()
  price: string;

  @Column()
  observation: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Voucher;
