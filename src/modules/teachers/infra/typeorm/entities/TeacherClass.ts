import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('teachers_classes')
class TeacherClass {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_teacher: string;

  @Column()
  id_court: string;

  @Column()
  id_sport: string;

  @Column()
  day_of_week: number;

  @Column()
  hour: number;

  @Column()
  price: number;

  @Column()
  limit: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  id_category: string;
}

export default TeacherClass;
