import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateWeekClassesUsers1626316387751
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'teachers_week_classes_users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_week',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'ssn',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'retrieved',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'canceled',
            type: 'boolean',
            isNullable: true,
            default: false,
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
            name: 'id_week',
            referencedTableName: 'teachers_week_classes',
            referencedColumnNames: ['id'],
            columnNames: ['id_week'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('teachers_week_classes_users');
  }
}
