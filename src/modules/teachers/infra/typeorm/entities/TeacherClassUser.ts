import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('teachers_classes_users')
class TeacherClassUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_class: string;

  @Column()
  id_user: string;

  @Column()
  name: string;

  @Column()
  ssn: string;

  @Column()
  birth_date: Date;

  @Column()
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TeacherClassUser;
