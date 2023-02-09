import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('teachers_week_classes_users')
class TeacherWeekClassUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_week: string;

  @Column()
  name: string;

  @Column()
  ssn: string;

  @Column()
  retrieved: boolean;

  @Column()
  canceled: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TeacherWeekClassUser;
