/* eslint-disable no-unused-expressions */
import { injectable, inject } from 'tsyringe';

import IReturnAdminFindAllDTO from '../dtos/IReturnAdminFindAllDTO';
import IMonthlyRepository from '../repositories/IMonthlyRepository';

@injectable()
class FindAllAdminService {
  constructor(
    @inject('MonthlyRepository')
    private monthlyRepository: IMonthlyRepository,
  ) {}

  public async execute(
    dayOfWeek: number,
    id_court: string,
  ): Promise<IReturnAdminFindAllDTO[]> {
    const monthly = await this.monthlyRepository.findAdminAll(
      dayOfWeek,
      id_court,
    );
    return monthly;
  }
}

export default FindAllAdminService;
