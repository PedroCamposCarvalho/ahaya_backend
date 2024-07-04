import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTeachersClassesUsers1670925021781
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'teachers_classes_users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_class',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_user',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ssn',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'birth_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar',
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
            name: 'id_class',
            referencedTableName: 'teachers_classes',
            referencedColumnNames: ['id'],
            columnNames: ['id_class'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('teachers_classes_users');
  }
}
