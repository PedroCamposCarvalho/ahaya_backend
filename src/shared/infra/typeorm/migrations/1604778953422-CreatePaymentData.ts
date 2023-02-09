import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePaymentData1604778953422
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payment_data',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'x_api_key',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'vendor',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'customer',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'customer_ssn',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'customer_phone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'customer_email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'customer_zipcode',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'customer_street',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'customer_number',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'customer_complement',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'customer_district',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'customer_cityname',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'customer_stateinitials',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'customer_countryname',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payment_data');
  }
}
