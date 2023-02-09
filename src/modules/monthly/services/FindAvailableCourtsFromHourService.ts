/* eslint-disable no-unused-expressions */
import { injectable, inject } from 'tsyringe';

import Court from '@modules/places/infra/typeorm/entities/Courts/Court';
import IMonthlyRepository from '../repositories/IMonthlyRepository';

@injectable()
class FindAvailableCourtsFromHourService {
  constructor(
    @inject('MonthlyRepository')
    private monthlyRepository: IMonthlyRepository,
  ) {}

  public async execute(dayOfWeek: number, hour: number): Promise<Court[]> {
    const courts = await this.monthlyRepository.findAvailableCourtsForHour(
      dayOfWeek,
      hour,
    );
    return courts;
  }
}

export default FindAvailableCourtsFromHourService;
