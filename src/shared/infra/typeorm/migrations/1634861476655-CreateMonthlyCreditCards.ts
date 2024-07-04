import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMonthlyCreditCards1634861476655
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'monthly_single_credit_cards',
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
            name: 'flag',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'last_digits',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'payment_profile',
            type: 'varchar',
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
    await queryRunner.dropTable('monthly_single_credit_cards');
  }
}
