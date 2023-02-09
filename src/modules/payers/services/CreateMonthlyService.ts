import { injectable, inject } from 'tsyringe';
import MonthlyConfig from '../infra/typeorm/entities/MonthlyConfig';
import ICreateMonthlyDTO from '../dtos/ICreateMonthlyDTO';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class CreateMonthlyService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute(data: ICreateMonthlyDTO): Promise<MonthlyConfig> {
    const monthly = await this.payersRepository.createMonthly(data);

    return monthly;
  }
}

export default CreateMonthlyService;
