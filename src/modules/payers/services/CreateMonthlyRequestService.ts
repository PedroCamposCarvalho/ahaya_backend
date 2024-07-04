import { injectable, inject } from 'tsyringe';
import MonthlyRequest from '../infra/typeorm/entities/MonthlyRequest';
import ICreateMonthlyRequestDTO from '../dtos/ICreateMonthlyRequestDTO';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class CreatePackagePayerService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute(
    data: ICreateMonthlyRequestDTO,
  ): Promise<MonthlyRequest> {
    const monthlyRequest = await this.payersRepository.createMonthlyRequest(
      data,
    );

    return monthlyRequest;
  }
}

export default CreatePackagePayerService;
