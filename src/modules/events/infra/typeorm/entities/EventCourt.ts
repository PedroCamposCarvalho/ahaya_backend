import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('events_courts')
class EventCourt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_event: string;

  @Column()
  id_court: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EventCourt;
