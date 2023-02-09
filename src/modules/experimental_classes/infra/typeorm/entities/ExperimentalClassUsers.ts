import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('experimental_classes_users')
class ExperimentalClassUsers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_experimental_class: string;

  @Column()
  id_user: string;

  @Column()
  paid: boolean;

  @Column()
  observation: string;

  @Column()
  paid_price: number;

  @Column()
  id_transaction: string;

  @Column()
  material_amount: number;

  @Column()
  ticket_number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ExperimentalClassUsers;
