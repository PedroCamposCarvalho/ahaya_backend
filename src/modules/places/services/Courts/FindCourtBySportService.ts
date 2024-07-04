import { injectable, inject } from 'tsyringe';
import Court from '../../infra/typeorm/entities/Courts/Court';
import ICourtsRepository from '../../repositories/Courts/ICourtsRepository';

@injectable()
class FindCourtsBySportId {
  constructor(
    @inject('CourtsRepository')
    private courtsRepository: ICourtsRepository,
  ) {}

  public async execute(id_sport: string): Promise<Court[]> {
    const courts = this.courtsRepository.findCourtsBySportId(id_sport);
    return courts;
  }
}

export default FindCourtsBySportId;
