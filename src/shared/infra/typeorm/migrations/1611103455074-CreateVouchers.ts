import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateVouchers1611103455074 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vouchers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_sport',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'percentage',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'id_user',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'pix_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'pix_key',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'paid',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'voucher_number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'decimal(12,2)',
            isNullable: false,
          },
          {
            name: 'observation',
            type: 'text',
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
            name: 'id_sport',
            referencedTableName: 'sports',
            referencedColumnNames: ['id'],
            columnNames: ['id_sport'],
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
    await queryRunner.dropTable('vouchers');
  }
}
