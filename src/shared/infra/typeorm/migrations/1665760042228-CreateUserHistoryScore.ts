import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserHistoryScore1665760042228
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_history_score',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_user',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_module',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal(12,2)',
            isNullable: false,
          },
          {
            name: 'points',
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
            name: 'id_module',
            referencedTableName: 'modules',
            referencedColumnNames: ['id'],
            columnNames: ['id_module'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_history_score');
  }
}
