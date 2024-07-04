import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('court_sport')
class CourtSport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  court_id: string;

  @Column()
  sport_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CourtSport;
