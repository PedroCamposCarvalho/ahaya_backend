import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sports_categories')
class SportCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_sport: string;

  @Column()
  identifier: string;

  @Column()
  description: string;

  @Column()
  strength: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SportCategory;
