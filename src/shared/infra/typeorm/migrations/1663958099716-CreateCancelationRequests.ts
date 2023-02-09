import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCancelationRequests1663958099716
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cancelation_requests',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_appointment',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'percentage',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'done',
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
        foreignKeys: [
          {
            name: 'id_appointment',
            referencedTableName: 'appointments',
            referencedColumnNames: ['id'],
            columnNames: ['id_appointment'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cancelation_requests');
  }
}
