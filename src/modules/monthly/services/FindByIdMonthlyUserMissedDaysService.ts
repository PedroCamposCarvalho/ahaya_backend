/* eslint-disable no-unused-expressions */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import MonthlyUserMissedDays from '../infra/typeorm/entities/MonthlyUserMissedDays';

import IMonthlyUserMissedDaysRepository from '../repositories/IMonthlyUserMissedDaysRepository';

@injectable()
class FindByIdMonthlyUserMissedDaysService {
  constructor(
    @inject('MonthlyUserMissedDaysRepository')
    private monthlyUserMissedDaysRepositoryRepository: IMonthlyUserMissedDaysRepository,
  ) {}

  public async execute(
    id_monthly: string,
  ): Promise<MonthlyUserMissedDays | undefined> {
    const monthlyMissedDays =
      await this.monthlyUserMissedDaysRepositoryRepository.findMonthlyUserMissedDaysById(
        id_monthly,
      );

    if (!monthlyMissedDays) {
      throw new AppError('MonthlyMissedDay not found!');
    }

    return monthlyMissedDays;
  }
}

export default FindByIdMonthlyUserMissedDaysService;
