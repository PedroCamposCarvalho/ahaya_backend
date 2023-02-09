import { injectable, inject } from 'tsyringe';
import Court from '../../infra/typeorm/entities/Courts/Court';
import ICourtsRepository from '../../repositories/Courts/ICourtsRepository';

@injectable()
class FindByIdService {
  constructor(
    @inject('CourtsRepository')
    private courtsRepository: ICourtsRepository,
  ) {}

  public async execute(id: string): Promise<Court> {
    const court = this.courtsRepository.findById(id);
    return court;
  }
}

export default FindByIdService;
