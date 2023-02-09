import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cancelation_rules')
class CancelationRule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hour: number;

  @Column()
  minutes: number;

  @Column()
  percentage: number;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CancelationRule;
