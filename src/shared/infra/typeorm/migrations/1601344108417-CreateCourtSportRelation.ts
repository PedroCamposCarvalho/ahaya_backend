import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCourtSportRelation1601344108417
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'court_sport',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'court_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'sport_id',
            type: 'uuid',
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
            name: 'court_id',
            referencedTableName: 'courts',
            referencedColumnNames: ['id'],
            columnNames: ['court_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'sport_id',
            referencedTableName: 'sports',
            referencedColumnNames: ['id'],
            columnNames: ['sport_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('court_sport');
  }
}
