/* eslint-disable no-unused-expressions */
import { injectable, inject } from 'tsyringe';

import Court from '@modules/places/infra/typeorm/entities/Courts/Court';
import IMonthlyRepository from '../repositories/IMonthlyRepository';

@injectable()
class FindAvailableCourtsToCreateOnWebSystemService {
  constructor(
    @inject('MonthlyRepository')
    private monthlyRepository: IMonthlyRepository,
  ) {}

  public async execute(
    dayOfWeek: number,
    initialHour: number,
    finalHour: number,
  ): Promise<Court[]> {
    const hours: number[] = [];

    for (let i = initialHour; i <= finalHour; i++) {
      hours.push(i);
    }

    const courts = await this.monthlyRepository.findAvailableCourtsByHours(
      dayOfWeek,
      hours,
    );

    return courts;
  }
}

export default FindAvailableCourtsToCreateOnWebSystemService;
