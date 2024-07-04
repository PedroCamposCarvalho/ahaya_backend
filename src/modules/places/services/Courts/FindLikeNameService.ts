import { injectable, inject } from 'tsyringe';
import Court from '../../infra/typeorm/entities/Courts/Court';
import ICourtsRepository from '../../repositories/Courts/ICourtsRepository';

@injectable()
class FindLikeNameService {
  constructor(
    @inject('CourtsRepository')
    private courtsRepository: ICourtsRepository,
  ) {}

  public async execute(id_place: string, name: string): Promise<Court[]> {
    const courts = this.courtsRepository.findLikeName(id_place, name);
    return courts;
  }
}

export default FindLikeNameService;
