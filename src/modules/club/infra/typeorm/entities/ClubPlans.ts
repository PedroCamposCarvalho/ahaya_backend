import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('club_plans')
class ClubPlans {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  months: number;

  @Column()
  price: number;

  @Column()
  student_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ClubPlans;
