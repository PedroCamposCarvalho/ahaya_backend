import { injectable, inject } from 'tsyringe';
import Court from '../../infra/typeorm/entities/Courts/Court';
import ICourtsRepository from '../../repositories/Courts/ICourtsRepository';

@injectable()
class UpdateCourtNameService {
  constructor(
    @inject('CourtsRepository')
    private courtsRepository: ICourtsRepository,
  ) {}

  public async execute(id: string, name: string): Promise<Court> {
    const court = this.courtsRepository.updateCourtName(id, name);
    return court;
  }
}

export default UpdateCourtNameService;
