import { injectable, inject } from 'tsyringe';
import Sport from '../../infra/typeorm/entities/Sports/Sport';
import ISportsRepository from '../../repositories/Sports/ISportsRepository';

@injectable()
class FindByCourtIdService {
  constructor(
    @inject('SportsRepository')
    private sportsRepository: ISportsRepository,
  ) {}

  public async execute(id_sport: string): Promise<Sport[]> {
    const sports = this.sportsRepository.findCourtsBySportId(id_sport);
    return sports;
  }
}

export default FindByCourtIdService;
