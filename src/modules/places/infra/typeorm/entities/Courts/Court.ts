import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';
import uploadConfig from '../../../../../../config/upload';

@Entity('courts')
class Court {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_place: string;

  @Column()
  name: string;

  @Column()
  id_type: string;

  @Column()
  covered: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  photo: string;

  @Expose({ name: 'photo_url' })
  getLogo_url(): string {
    if (!this.photo) {
      return '';
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.photo}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.photo}`;
      default:
        return '';
    }
  }
}

export default Court;
