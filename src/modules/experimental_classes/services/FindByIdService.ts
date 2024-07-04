import { injectable, inject } from 'tsyringe';
import IFindByIdServiceDTO from '../dtos/IFindByIdServiceDTO';
import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class FindByIdService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(
    id_experimentalclass: string,
  ): Promise<IFindByIdServiceDTO> {
    const experimentalClass =
      this.experimentalClassRepository.findById(id_experimentalclass);

    return experimentalClass;
  }
}

export default FindByIdService;
