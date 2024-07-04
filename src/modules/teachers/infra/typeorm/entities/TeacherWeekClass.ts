import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('teachers_week_classes')
class TeacherWeekClass {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_class: string;

  @Column()
  start_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TeacherWeekClass;
