import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('packages_payers')
class PackagesPayers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_user: string;

  @Column()
  id_package: string;

  @Column()
  paid: boolean;

  @Column()
  paid_date: Date;

  @Column()
  id_transaction: string;

  @Column()
  courtesy: number;

  @Column()
  discount: number;

  @Column()
  expires_in: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PackagesPayers;
