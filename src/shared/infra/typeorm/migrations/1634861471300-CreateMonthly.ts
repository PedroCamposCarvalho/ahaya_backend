import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMonthly1634861471300 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'monthly',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_court',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_user',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'week_day',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'hour',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal(12,2)',
            isNullable: false,
          },
          {
            name: 'sandbox_product',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'production_product',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'renew_date',
            type: 'timestamp with time zone',
            isNullable: true,
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
        foreignKeys: [
          {
            name: 'id_court',
            referencedTableName: 'courts',
            referencedColumnNames: ['id'],
            columnNames: ['id_court'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'id_user',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['id_user'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('monthly');
  }
}
