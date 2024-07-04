import { injectable, inject } from 'tsyringe';
import ICreatePlaceDTO from '../../dtos/Places/ICreatePlaceDTO';
import Place from '../../infra/typeorm/entities/Places/Place';
import IPlacesRepository from '../../repositories/Places/IPlacesRepository';

@injectable()
class CreatePlaceService {
  constructor(
    @inject('PlacesRepository')
    private placesRepository: IPlacesRepository,
  ) {}

  public async execute({
    name,
    telephone,
    street,
    number,
    complement,
    zip_code,
    city,
    state,
    country,
  }: ICreatePlaceDTO): Promise<Place> {
    const place = this.placesRepository.create({
      name,
      telephone,
      street,
      number,
      complement,
      zip_code,
      city,
      state,
      country,
    });

    return place;
  }
}

export default CreatePlaceService;
