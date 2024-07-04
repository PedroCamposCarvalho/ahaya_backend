import { injectable, inject } from 'tsyringe';
import IReturnFindClassByIdDTO from '../dtos/IReturnFindClassByIdDTO';
import ITeacherRepository from '../repositories/ITeacherRepository';

@injectable()
class FindClassByIdService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(id_class: string): Promise<IReturnFindClassByIdDTO> {
    const teacherClass = this.teachersRepository.findClassById(id_class);

    return teacherClass;
  }
}

export default FindClassByIdService;
