import { injectable, inject } from 'tsyringe';
import ITeacherRepository from '../repositories/ITeacherRepository';

@injectable()
class CreateWeekClassesService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(): Promise<void> {
    await this.teachersRepository.createTeacherWeeksClasses();
  }
}

export default CreateWeekClassesService;
