/* eslint-disable no-unused-expressions */
import { injectable, inject } from 'tsyringe';

import Monthly from '../infra/typeorm/entities/Monthly';
import IMonthlyRepository from '../repositories/IMonthlyRepository';

@injectable()
class FindMonthlyHoursService {
  constructor(
    @inject('MonthlyRepository')
    private monthlyRepository: IMonthlyRepository,
  ) {}

  public async execute(
    dayOfWeek: number,
    id_court: string,
  ): Promise<Monthly[]> {
    const monthly = await this.monthlyRepository.findMonthlyHours(
      dayOfWeek,
      id_court,
    );
    return monthly;
  }
}

export default FindMonthlyHoursService;
