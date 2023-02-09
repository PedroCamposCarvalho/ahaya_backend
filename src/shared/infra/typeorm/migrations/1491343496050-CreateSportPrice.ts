import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSportsPrice1491343496050
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sport_price',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'sport_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'monthly',
            type: 'decimal(12,2)',
            isNullable: true,
          },
          {
            name: 'weekend_monthly',
            type: 'decimal(12,2)',
            isNullable: true,
          },
          {
            name: 'regular',
            type: 'decimal(12,2)',
            isNullable: true,
          },
          {
            name: 'weekend_regular',
            type: 'decimal(12,2)',
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
            name: 'sport_id',
            referencedTableName: 'sports',
            referencedColumnNames: ['id'],
            columnNames: ['sport_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sport_price');
  }
}
