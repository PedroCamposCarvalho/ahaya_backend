import { injectable, inject } from 'tsyringe';
import Teacher from '../infra/typeorm/entities/Teacher';
import ITeacherRepository from '../repositories/ITeacherRepository';

@injectable()
class UpdateDescriptionService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(
    id_teacher: string,
    description: string,
  ): Promise<Teacher> {
    const teacher = this.teachersRepository.updateDescription(
      id_teacher,
      description,
    );

    return teacher;
  }
}

export default UpdateDescriptionService;
