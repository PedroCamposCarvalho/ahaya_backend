import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateExperimentalClassExceptions1660146121429
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'experimental_classes_exceptions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_place',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp without time zone',
            isNullable: false,
          },
          {
            name: 'hour',
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
            name: 'id_place',
            referencedTableName: 'places',
            referencedColumnNames: ['id'],
            columnNames: ['id_place'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('experimental_classes_exceptions');
  }
}
