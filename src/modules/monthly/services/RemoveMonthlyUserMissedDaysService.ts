/* eslint-disable no-unused-expressions */
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IMonthlyUserMissedDaysRepository from '../repositories/IMonthlyUserMissedDaysRepository';

@injectable()
class RemoveMonthlyUserMissedDaysService {
  constructor(
    @inject('MonthlyUserMissedDaysRepository')
    private monthlyUserMissedDaysRepositoryRepository: IMonthlyUserMissedDaysRepository,
  ) {}

  public async execute(id_monthly: string): Promise<void> {
    const monthlyMissedDays =
      await this.monthlyUserMissedDaysRepositoryRepository.findMonthlyUserMissedDaysById(
        id_monthly,
      );

    if (!monthlyMissedDays) {
      throw new AppError('MonthlyMissedDay not found!');
    }

    await this.monthlyUserMissedDaysRepositoryRepository.removeMonthlyUserMissedDays(
      id_monthly,
    );
  }
}

export default RemoveMonthlyUserMissedDaysService;
