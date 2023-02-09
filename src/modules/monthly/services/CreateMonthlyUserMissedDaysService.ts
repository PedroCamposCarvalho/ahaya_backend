/* eslint-disable no-unused-expressions */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMonthlyUserMissedDaysRepository from '../repositories/IMonthlyUserMissedDaysRepository';
import MonthlyUserMissedDays from '../infra/typeorm/entities/MonthlyUserMissedDays';

@injectable()
class CreateMonthlyUserMissedDaysService {
  constructor(
    @inject('MonthlyUserMissedDaysRepository')
    private monthlyUserMissedDaysRepositoryRepository: IMonthlyUserMissedDaysRepository,
  ) {}

  public async execute(
    id_monthly: string,
    date: Date,
  ): Promise<MonthlyUserMissedDays> {
    let monthlyUserMissed;

    try {
      monthlyUserMissed =
        await this.monthlyUserMissedDaysRepositoryRepository.createMonthlyUserMissedDays(
          {
            id_monthly,
            date,
          },
        );
    } catch (error) {
      throw new AppError('Error on Create UserMissedDays');
    }

    return monthlyUserMissed;
  }
}

export default CreateMonthlyUserMissedDaysService;
