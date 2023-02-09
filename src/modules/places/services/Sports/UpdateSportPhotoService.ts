import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/Providers/StorageProvider/models/IStorageProvider';
import Sport from '../../infra/typeorm/entities/Sports/Sport';
import ISportsRepository from '../../repositories/Sports/ISportsRepository';

interface IRequest {
  id: string;
  photoFileName: string | undefined;
}

@injectable()
class UpdateSportPhotoService {
  constructor(
    @inject('SportsRepository')
    private sportsRepository: ISportsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id, photoFileName }: IRequest): Promise<Sport> {
    try {
      const sport = await this.sportsRepository.findById(id);

      if (sport.photo) {
        await this.storageProvider.deleteFile(sport.photo);
      }

      if (photoFileName) {
        await this.storageProvider.saveFile(photoFileName);
        sport.photo = `https://app-ahaya.s3.amazonaws.com/${photoFileName}`;
        await this.sportsRepository.save(sport);
        return sport;
      }
      throw new Error();
    } catch (error) {
      throw new Error();
    }
  }
}

export default UpdateSportPhotoService;
