import { injectable, inject } from 'tsyringe';
import MonthlyConfig from '../infra/typeorm/entities/MonthlyConfig';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class FindAllMonthlyService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute(): Promise<MonthlyConfig[]> {
    const monthlys = await this.payersRepository.findAllMonthly();

    return monthlys;
  }
}

export default FindAllMonthlyService;
