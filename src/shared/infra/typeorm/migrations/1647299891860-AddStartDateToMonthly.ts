import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddStartDateToMonthly1647299891860 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('monthly', [
      new TableColumn({
        name: 'start_date',
        type: 'timestamp',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('monthly', 'start_date');
  }
}
