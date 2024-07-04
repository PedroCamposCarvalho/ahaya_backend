import { injectable, inject } from 'tsyringe';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class FindMonthlyPriceByHourService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
  ) {}

  public async execute(hour: number): Promise<number> {
    const price = await this.payersRepository.findMonthlyPriceByHour(hour);

    return price;
  }
}

export default FindMonthlyPriceByHourService;
