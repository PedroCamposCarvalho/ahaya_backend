import { injectable, inject } from 'tsyringe';
import IGetCourtsDTO from '../../dtos/Courts/IGetCourtsDTO';
import ICourtsRepository from '../../repositories/Courts/ICourtsRepository';

@injectable()
class CreateCourtService {
  constructor(
    @inject('CourtsRepository')
    private courtsRepository: ICourtsRepository,
  ) {}

  public async execute(id_place: string): Promise<IGetCourtsDTO[]> {
    const courts = this.courtsRepository.getAll(id_place);
    return courts;
  }
}

export default CreateCourtService;
