import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('score_rules')
class ScoreRule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_module: string;

  @Column()
  price: number;

  @Column()
  points: number;

  @Column()
  each_point_worth: number;

  @Column()
  description: string;

  @Column()
  discount: boolean;

  @Column()
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ScoreRule;
