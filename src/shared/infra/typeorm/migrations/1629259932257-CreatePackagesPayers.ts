import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePackagesPayers1629259932257
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'packages_payers',
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
            name: 'id_package',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'paid',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'paid_date',
            type: 'timestamp without time zone',
            isNullable: true,
          },
          {
            name: 'id_transaction',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'courtesy',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'discount',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'expires_in',
            type: 'timestamp without time zone',
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
            name: 'id_package',
            referencedTableName: 'packages_config',
            referencedColumnNames: ['id'],
            columnNames: ['id_package'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('packages_payers');
  }
}
