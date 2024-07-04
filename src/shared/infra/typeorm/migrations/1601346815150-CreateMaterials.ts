import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSportMaterial1601346815150
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'materials',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'material',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'sport_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'photo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'price',
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
    await queryRunner.dropTable('materials');
  }
}
