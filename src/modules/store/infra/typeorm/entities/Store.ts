import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';
import uploadConfig from '../../../../../config/upload';

@Entity('store')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  inventory: number;

  @Column()
  image1: string;

  @Column()
  image2: string;

  @Column()
  image3: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'image1' })
  getImage1Url(): string | null {
    if (!this.image1) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.image1}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.image1}`;
      default:
        return null;
    }
  }

  @Expose({ name: 'image2' })
  getImage2Url(): string | null {
    if (!this.image1) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.image2}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.image2}`;
      default:
        return null;
    }
  }

  @Expose({ name: 'image3' })
  getImage3Url(): string | null {
    if (!this.image1) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.image3}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.image3}`;
      default:
        return null;
    }
  }
}

export default User;
