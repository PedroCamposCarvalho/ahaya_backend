/* eslint-disable no-unused-expressions */
import { injectable, inject } from 'tsyringe';

import Monthly from '../infra/typeorm/entities/Monthly';
import IMonthlyRepository from '../repositories/IMonthlyRepository';

@injectable()
class FindUserMonthlyService {
  constructor(
    @inject('MonthlyRepository')
    private monthlyRepository: IMonthlyRepository,
  ) {}

  public async execute(id_user: string): Promise<Monthly[]> {
    const monthly = await this.monthlyRepository.findUserMonthly(id_user);
    return monthly;
  }
}

export default FindUserMonthlyService;
