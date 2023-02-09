import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('experimental_classes_config')
class ExperimentalClassConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_place: string;

  @Column()
  price: number;

  @Column()
  limit: number;

  @Column()
  week_number: number;

  @Column()
  hour: number;

  @Column()
  minutes: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ExperimentalClassConfig;
