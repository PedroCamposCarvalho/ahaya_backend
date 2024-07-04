import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('vouchers_menu')
class VoucherMenu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_sport: string;

  @Column()
  percentage: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default VoucherMenu;
