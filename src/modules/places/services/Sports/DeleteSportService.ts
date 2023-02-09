import { injectable, inject } from 'tsyringe';
import Sport from '../../infra/typeorm/entities/Sports/Sport';
import ISportsRepository from '../../repositories/Sports/ISportsRepository';

@injectable()
class CreateSportService {
  constructor(
    @inject('SportsRepository')
    private sportsRepository: ISportsRepository,
  ) {}

  public async execute(id: string): Promise<Sport> {
    const sport = this.sportsRepository.deleteSport(id);

    return sport;
  }
}

export default CreateSportService;
