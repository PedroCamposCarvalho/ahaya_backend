import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import IMonthlyUserMissedDaysRepository from '@modules/monthly/repositories/IMonthlyUserMissedDaysRepository';
import ICreateMonthlyUserMissedDaysDTO from '@modules/monthly/dtos/ICreateMonthlyUserMissedDaysDTO';
import MonthlyUserMissedDays from '../entities/MonthlyUserMissedDays';

class MonthlyUserMissedDaysRepository
  implements IMonthlyUserMissedDaysRepository
{
  private ormRepository: Repository<MonthlyUserMissedDays>;

  constructor() {
    this.ormRepository = getRepository(MonthlyUserMissedDays);
  }

  public async createMonthlyUserMissedDays(
    data: ICreateMonthlyUserMissedDaysDTO,
  ): Promise<MonthlyUserMissedDays> {
    const monthlyMissedDays = await this.ormRepository.create(data);

    await this.ormRepository.save(monthlyMissedDays);

    return monthlyMissedDays;
  }

  public async findMonthlyUserMissedDaysById(
    id_monthly: string,
  ): Promise<MonthlyUserMissedDays | undefined> {
    const monthlyMissedDays = await this.ormRepository.findOne({
      where: { id_monthly },
    });
    return monthlyMissedDays;
  }

  public async removeMonthlyUserMissedDays(
    id_monthlyMissedDays: string,
  ): Promise<void> {
    const monthly = await this.ormRepository.findOne({
      where: { id: id_monthlyMissedDays },
    });

    if (!monthly) {
      throw new AppError('Not found!');
    }

    await this.ormRepository.remove(monthly);
  }

  public async findAllByDate(
    day: number,
    month: number,
    year: number,
  ): Promise<MonthlyUserMissedDays[]> {
    const monthlyPayers = await this.ormRepository.query(
      `select id, id_monthly, date from monthly_user_missed_days where date::date = '${year}-${month}-${day}'`,
    );

    return monthlyPayers;
  }
}
export default MonthlyUserMissedDaysRepository;
