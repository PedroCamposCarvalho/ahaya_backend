import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTeachersClasses1624668252987
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'teachers_classes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_teacher',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_court',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_sport',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_category',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'day_of_week',
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
            name: 'limit',
            type: 'integer',
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
            name: 'id_teacher',
            referencedTableName: 'teachers',
            referencedColumnNames: ['id'],
            columnNames: ['id_teacher'],
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
          {
            name: 'id_category',
            referencedTableName: 'sports_categories',
            referencedColumnNames: ['id'],
            columnNames: ['id_category'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('teachers_classes');
  }
}
