/* eslint-disable no-unused-expressions */
import { injectable, inject } from 'tsyringe';

import ICreateMonthlyUserOnWebSystemDTO from '../dtos/ICreateMonthlyUserOnWebSystemDTO';
import IMonthlyRepository from '../repositories/IMonthlyRepository';

@injectable()
class CreteMonthlyUserOnWebSystemService {
  constructor(
    @inject('MonthlyRepository')
    private monthlyRepository: IMonthlyRepository,
  ) {}

  public async execute(
    data: ICreateMonthlyUserOnWebSystemDTO,
  ): Promise<boolean> {
    const monthly = this.monthlyRepository.createMonthlyUserOnWebSystem(data);

    return monthly;
  }
}

export default CreteMonthlyUserOnWebSystemService;
