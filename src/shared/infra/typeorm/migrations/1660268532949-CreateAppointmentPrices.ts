import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointmentPrices1660268532949
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments_prices',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_sport',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_court',
            type: 'uuid',
            isNullable: false,
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
            name: 'id_sport',
            referencedTableName: 'sports',
            referencedColumnNames: ['id'],
            columnNames: ['id_sport'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'id_court',
            referencedTableName: 'courts',
            referencedColumnNames: ['id'],
            columnNames: ['id_court'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments_prices');
  }
}
