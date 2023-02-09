import { injectable, inject } from 'tsyringe';
import MonthlyConfig from '../infra/typeorm/entities/MonthlyConfig';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class DeleteMonthlyService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute(id: string): Promise<MonthlyConfig> {
    const existingMonthly = await this.payersRepository.deleteMonthly(id);

    return existingMonthly;
  }
}

export default DeleteMonthlyService;
