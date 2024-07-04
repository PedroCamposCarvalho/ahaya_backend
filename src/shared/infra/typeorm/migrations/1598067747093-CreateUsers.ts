import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1598067747093 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'ssn',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'id_place',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'user_type',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'is_monthly',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'cellphone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'vip',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'zipCode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'street',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'district',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'customer_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'payment_profile_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'notification_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'birth_date',
            type: 'timestamp with time zone',
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
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
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
            name: 'user_type',
            referencedTableName: 'user_types',
            referencedColumnNames: ['id'],
            columnNames: ['user_type'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
