import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCancelationRules1663868764885
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cancelation_rules',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'hour',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'minutes',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'percentage',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'active',
            type: 'boolean',
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
    await queryRunner.dropTable('cancelation_rules');
  }
}
