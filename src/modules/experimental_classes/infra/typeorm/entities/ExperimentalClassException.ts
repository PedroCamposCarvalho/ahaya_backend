import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('experimental_classes_exceptions')
class ExperimentalClassException {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_place: string;

  @Column()
  date: Date;

  @Column()
  hour: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ExperimentalClassException;
