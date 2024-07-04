import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('payment_data')
class PaymentData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  x_api_key: string;

  @Column()
  vendor: string;

  @Column()
  customer: string;

  @Column()
  customer_ssn: string;

  @Column()
  customer_phone: string;

  @Column()
  customer_email: string;

  @Column()
  customer_zipcode: string;

  @Column()
  customer_street: string;

  @Column()
  customer_number: string;

  @Column()
  customer_complement: string;

  @Column()
  customer_district: string;

  @Column()
  customer_cityname: string;

  @Column()
  customer_stateinitials: string;

  @Column()
  customer_countryname: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PaymentData;
