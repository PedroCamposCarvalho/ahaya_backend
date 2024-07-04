import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class MonthlyUserMissedDays1648631664214
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'monthly_user_missed_days',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_monthly',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            name: 'id_monthly',
            referencedTableName: 'monthly',
            referencedColumnNames: ['id'],
            columnNames: ['id_monthly'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('monthly_user_missed_days');
  }
}
