import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/Providers/StorageProvider/models/IStorageProvider';
import Place from '../../infra/typeorm/entities/Places/Place';
import AppError from '../../../../shared/errors/AppError';
import IPlacesRepository from '../../repositories/Places/IPlacesRepository';

interface IRequest {
  place_id: string;
  logoFilename: string;
}

@injectable()
class UpdatePlaceLogoService {
  constructor(
    @inject('PlacesRepository')
    private placesRepository: IPlacesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ place_id, logoFilename }: IRequest): Promise<Place> {
    const place = await this.placesRepository.findById(place_id);
    if (!place) {
      throw new AppError('Only authenticated users can change the logo', 401);
    }
    if (place.logo) {
      await this.storageProvider.deleteFile(place.logo);
    }

    await this.storageProvider.saveFile(logoFilename);
    place.logo = logoFilename;
    await this.placesRepository.save(place);
    return place;
  }
}

export default UpdatePlaceLogoService;
