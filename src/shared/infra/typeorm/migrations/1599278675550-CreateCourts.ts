import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCourts1599278675550 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'courts',
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
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'id_type',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'covered',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'photo',
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
            name: 'id_place',
            referencedTableName: 'places',
            referencedColumnNames: ['id'],
            columnNames: ['id_place'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'id_type',
            referencedTableName: 'court_types',
            referencedColumnNames: ['id'],
            columnNames: ['id_type'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('courts');
  }
}
