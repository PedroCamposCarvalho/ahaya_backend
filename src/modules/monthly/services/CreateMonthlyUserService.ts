/* eslint-disable no-unused-expressions */
import { injectable, inject } from 'tsyringe';

import Monthly from '../infra/typeorm/entities/Monthly';

import ICreateMonthlyUserDTO from '../dtos/ICreateMonthlyUserDTO';
import IMonthlyRepository from '../repositories/IMonthlyRepository';

@injectable()
class CreateMonthlyUserService {
  constructor(
    @inject('MonthlyRepository')
    private monthlyRepository: IMonthlyRepository,
  ) {}

  public async execute(data: ICreateMonthlyUserDTO): Promise<Monthly> {
    const start_date = new Date();
    
    data.start_date = start_date;

    const monthly = this.monthlyRepository.createMonthlyUser(data);

    return monthly;
  }
}

export default CreateMonthlyUserService;
