import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('terms_conditions')
class TermsConditions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  terms: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TermsConditions;
