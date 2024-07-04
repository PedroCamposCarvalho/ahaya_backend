import { injectable, inject } from 'tsyringe';
import MonthlyConfig from '../infra/typeorm/entities/MonthlyConfig';
import IUpdateMonthlyDTO from '../dtos/IUpdateMonthlyDTO';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class UpdateMonthlyService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute(data: IUpdateMonthlyDTO): Promise<MonthlyConfig> {
    const existingMonthly = await this.payersRepository.updateMonthly(data);

    return existingMonthly;
  }
}

export default UpdateMonthlyService;
