import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';
import uploadConfig from '../../../../../../config/upload';

@Entity('materials')
class Materials {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  material: string;

  @Column()
  sport_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  photo: string;

  @Expose({ name: 'photo_url' })
  getLogo_url(): string | null {
    if (!this.photo) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.photo}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.photo}`;
      default:
        return null;
    }
  }

  @Column()
  price: number;
}

export default Materials;
