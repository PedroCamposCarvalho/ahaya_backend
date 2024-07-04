/* eslint-disable no-unused-expressions */
import { injectable, inject } from 'tsyringe';

import Monthly from '../infra/typeorm/entities/Monthly';
import IMonthlyRepository from '../repositories/IMonthlyRepository';

@injectable()
class RemoveMonthlyService {
  constructor(
    @inject('MonthlyRepository')
    private monthlyRepository: IMonthlyRepository,
  ) {}

  public async execute(id_monthly: string): Promise<Monthly> {
    const monthly = await this.monthlyRepository.removeMonthly(id_monthly);
    return monthly;
  }
}

export default RemoveMonthlyService;
