import ICreateMonthlyUserMissedDaysDTO from '@modules/monthly/dtos/ICreateMonthlyUserMissedDaysDTO';
import MonthlyUserMissedDays from '../infra/typeorm/entities/MonthlyUserMissedDays';

export default interface IMonthlyUserMissedDaysRepository {
  createMonthlyUserMissedDays(
    data: ICreateMonthlyUserMissedDaysDTO,
  ): Promise<MonthlyUserMissedDays>;
  findMonthlyUserMissedDaysById(
    id_monthlyMissedDays: string,
  ): Promise<MonthlyUserMissedDays | undefined>;
  removeMonthlyUserMissedDays(id_monthlyMissedDays: string): Promise<void>;
  findAllByDate(
    day: number,
    month: number,
    year: number,
  ): Promise<MonthlyUserMissedDays[]>;
}
