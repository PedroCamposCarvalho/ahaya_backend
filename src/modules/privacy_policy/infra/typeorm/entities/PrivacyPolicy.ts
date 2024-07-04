import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('privacy_policy')
class PrivacyPolicy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_place: string;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PrivacyPolicy;
