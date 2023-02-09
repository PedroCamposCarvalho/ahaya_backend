import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/Providers/StorageProvider/models/IStorageProvider';
import Court from '../../infra/typeorm/entities/Courts/Court';
import AppError from '../../../../shared/errors/AppError';
import ICourtsRepository from '../../repositories/Courts/ICourtsRepository';

interface IRequest {
  court_id: string;
  photoFilename: string;
}

@injectable()
class UpdateCourtPhotoService {
  constructor(
    @inject('CourtsRepository')
    private courtsRepository: ICourtsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ court_id, photoFilename }: IRequest): Promise<Court> {
    const court = await this.courtsRepository.findById(court_id);
    if (!court) {
      throw new AppError('Only authenticated users can change the photo', 401);
    }
    if (court.photo) {
      await this.storageProvider.deleteFile(court.photo);
    }

    await this.storageProvider.saveFile(photoFilename);
    court.photo = photoFilename;
    await this.courtsRepository.save(court);
    return court;
  }
}

export default UpdateCourtPhotoService;
