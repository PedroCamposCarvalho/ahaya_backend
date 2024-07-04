import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEventsUsers1613081459194
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'events_users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_event',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_user',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'paid',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'observation',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'paid_price',
            type: 'decimal(12,2)',
            isNullable: false,
          },
          {
            name: 'id_transaction',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'material_amount',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'ticket_number',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'retrieved',
            type: 'integer',
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
            name: 'id_event',
            referencedTableName: 'events',
            referencedColumnNames: ['id'],
            columnNames: ['id_event'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'id_user',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['id_user'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('events_users');
  }
}
