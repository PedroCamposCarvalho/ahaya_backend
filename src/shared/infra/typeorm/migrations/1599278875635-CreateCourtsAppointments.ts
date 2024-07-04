import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCourtsAppointments1599278875635
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
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
            name: 'id_court',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal(12,2)',
            isNullable: false,
          },
          {
            name: 'start_date',
            type: 'timestamp without time zone',
            isNullable: false,
          },
          {
            name: 'finish_date',
            type: 'timestamp without time zone',
            isNullable: false,
          },
          {
            name: 'canceled',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'created_sequence',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'id_transaction',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'observation',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'number_of_players',
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
            name: 'id_court',
            referencedTableName: 'courts',
            referencedColumnNames: ['id'],
            columnNames: ['id_court'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
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
    await queryRunner.dropTable('appointments');
  }
}
