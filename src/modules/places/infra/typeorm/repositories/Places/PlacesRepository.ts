import { getRepository, Repository } from 'typeorm';

import IPlacesRepository from '@modules/places/repositories/Places/IPlacesRepository';
import ICreatePlaceDTO from '@modules/places/dtos/Places/ICreatePlaceDTO';

import AppError from '@shared/errors/AppError';
import Place from '../../entities/Places/Place';

class PlacesRepository implements IPlacesRepository {
  private ormRepository: Repository<Place>;

  constructor() {
    this.ormRepository = getRepository(Place);
  }

  public async create(placeData: ICreatePlaceDTO): Promise<Place> {
    const place = this.ormRepository.create(placeData);
    await this.ormRepository.save(place);
    return place;
  }

  public async save(place: Place): Promise<Place> {
    return this.ormRepository.save(place);
  }

  public async getAll(): Promise<Place[]> {
    try {
      const places = await this.ormRepository.find();
      return places;
    } catch (error) {
      throw new Error();
    }
  }

  public async findById(id: string): Promise<Place> {
    const place = await this.ormRepository.findOne({ where: { id } });
    if (!place) {
      throw new AppError('Place not found');
    }
    return place;
  }
}
export default PlacesRepository;
