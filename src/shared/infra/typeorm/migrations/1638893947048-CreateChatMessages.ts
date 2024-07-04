import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateChatMessages1638893947048
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'chat_messages',
        columns: [
          {
            name: '_id',
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
            name: 'id_admin',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'sender',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'text',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
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
            name: 'id_admin',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['id_admin'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'sender',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['sender'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('chat_messages');
  }
}
