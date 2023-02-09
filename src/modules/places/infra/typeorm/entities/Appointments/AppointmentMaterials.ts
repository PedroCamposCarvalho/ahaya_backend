import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('appointments_materials')
class AppointmentMaterials {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_appointment: string;

  @Column()
  id_material: string;

  @Column()
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AppointmentMaterials;
