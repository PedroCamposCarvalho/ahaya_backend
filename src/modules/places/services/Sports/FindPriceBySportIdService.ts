import { injectable, inject } from 'tsyringe';
import Sport from '../../infra/typeorm/entities/Sports/Sport';
import ISportsRepository from '../../repositories/Sports/ISportsRepository';

@injectable()
class FindPriceBySportIdService {
  constructor(
    @inject('SportsRepository')
    private sportsRepository: ISportsRepository,
  ) {}

  public async execute(id_sport: string): Promise<Sport> {
    const sport = this.sportsRepository.findPriceBySportId(id_sport);
    return sport;
  }
}

export default FindPriceBySportIdService;
