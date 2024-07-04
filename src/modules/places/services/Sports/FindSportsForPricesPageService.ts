import { injectable, inject } from 'tsyringe';
import Sport from '../../infra/typeorm/entities/Sports/Sport';
import ISportsRepository from '../../repositories/Sports/ISportsRepository';

@injectable()
class FindSportsForPricesPageService {
  constructor(
    @inject('SportsRepository')
    private sportsRepository: ISportsRepository,
  ) {}

  public async execute(): Promise<Sport[]> {
    const sports = this.sportsRepository.findSportsForPricesPage();
    return sports;
  }
}

export default FindSportsForPricesPageService;
