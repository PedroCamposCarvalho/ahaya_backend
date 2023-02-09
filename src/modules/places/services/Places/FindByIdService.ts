import { injectable, inject } from 'tsyringe';
import Place from '../../infra/typeorm/entities/Places/Place';
import IPlacesRepository from '../../repositories/Places/IPlacesRepository';

@injectable()
class FindByIdService {
  constructor(
    @inject('PlacesRepository')
    private placesRepository: IPlacesRepository,
  ) {}

  public async execute(id: string): Promise<Place | undefined> {
    const place = await this.placesRepository.findById(id);
    return place;
  }
}

export default FindByIdService;
