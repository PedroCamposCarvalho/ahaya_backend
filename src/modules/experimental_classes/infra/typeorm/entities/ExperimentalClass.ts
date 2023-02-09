import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('experimental_classes')
class ExperimentalClass {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_place: string;

  @Column()
  price: number;

  @Column()
  limit: number;

  @Column()
  start_date: Date;

  @Column()
  finish_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ExperimentalClass;
