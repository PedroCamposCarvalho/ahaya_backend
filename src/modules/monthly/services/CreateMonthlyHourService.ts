/* eslint-disable no-unused-expressions */
import { injectable, inject } from 'tsyringe';

import ICreateMonthlyDayDTO from '../dtos/ICreateMonthlyDayDTO';
import IMonthlyRepository from '../repositories/IMonthlyRepository';

@injectable()
class CreateMonthlyHourService {
  constructor(
    @inject('MonthlyRepository')
    private monthlyRepository: IMonthlyRepository,
  ) {}

  public async execute(data: ICreateMonthlyDayDTO): Promise<void> {
    const hours: number[] = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ];

    hours.map(async hour => {
      await this.monthlyRepository.createMonthlyHour({
        hour,
        id_court: data.id_court,
        price: data.price,
        production_product: data.production_product,
        sandbox_product: data.sandbox_product,
        week_day: data.week_day,
      });
    });
  }
}

export default CreateMonthlyHourService;
