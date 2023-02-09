import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/Providers/StorageProvider/models/IStorageProvider';
import Teacher from '../infra/typeorm/entities/Teacher';
import ITeacherRepository from '../repositories/ITeacherRepository';

interface IRequest {
  id_teacher: string;
  photoFilename: string;
}

@injectable()
class UpdateTeacherPhotoService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    id_teacher,
    photoFilename,
  }: IRequest): Promise<Teacher> {
    const teacher = await this.teachersRepository.findTeacherById(id_teacher);

    if (teacher.photo_url) {
      await this.storageProvider.deleteFile(teacher.photo_url);
    }

    await this.storageProvider.saveFile(photoFilename);
    teacher.photo_url = photoFilename;
    await this.teachersRepository.saveTeacher(teacher);
    return teacher;
  }
}

export default UpdateTeacherPhotoService;
