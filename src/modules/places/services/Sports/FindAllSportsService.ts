import { injectable, inject } from 'tsyringe';
import IReturnAllSportsDTO from '../../dtos/Sports/IReturnAllSportsDTO';
import ISportsRepository from '../../repositories/Sports/ISportsRepository';

@injectable()
class FindAllSportsService {
  constructor(
    @inject('SportsRepository')
    private sportsRepository: ISportsRepository,
  ) {}

  public async execute(): Promise<IReturnAllSportsDTO[]> {
    const sports = this.sportsRepository.findAll();

    return sports;
  }
}

export default FindAllSportsService;
