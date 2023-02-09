import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cancelation_requests')
class CancelationRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_appointment: string;

  @Column()
  percentage: number;

  @Column()
  done: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CancelationRequest;
