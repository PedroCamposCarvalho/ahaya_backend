import { injectable, inject } from 'tsyringe';
import Place from '../../infra/typeorm/entities/Places/Place';
import IPlacesRepository from '../../repositories/Places/IPlacesRepository';

@injectable()
class GetPlacesService {
  constructor(
    @inject('PlacesRepository')
    private placesRepository: IPlacesRepository,
  ) {}

  public async execute(): Promise<Place[]> {
    const places = await this.placesRepository.getAll();
    return places;
  }
}

export default GetPlacesService;
