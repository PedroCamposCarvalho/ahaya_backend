import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateClubMembers1617753348574
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'club_members',
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
            name: 'id_plan',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'expires_in',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'id_transaction',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'drink',
            type: 'boolean',
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
            name: 'id_user',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['id_user'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'id_plan',
            referencedTableName: 'club_plans',
            referencedColumnNames: ['id'],
            columnNames: ['id_plan'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('club_members');
  }
}
