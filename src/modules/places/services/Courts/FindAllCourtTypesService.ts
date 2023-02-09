import { injectable, inject } from 'tsyringe';
import CourtType from '../../infra/typeorm/entities/Courts/CourtType';
import ICourtsRepository from '../../repositories/Courts/ICourtsRepository';

@injectable()
class FindAllCourtTypesService {
  constructor(
    @inject('CourtsRepository')
    private courtsRepository: ICourtsRepository,
  ) {}

  public async execute(): Promise<CourtType[]> {
    const courtTypes = this.courtsRepository.findAllCourtTypes();
    return courtTypes;
  }
}

export default FindAllCourtTypesService;
