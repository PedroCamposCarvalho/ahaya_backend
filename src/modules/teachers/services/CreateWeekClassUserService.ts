import { injectable, inject } from 'tsyringe';
import TeacherWeekClassUsers from '../infra/typeorm/entities/TeacherWeekClassUsers';
import ITeacherRepository from '../repositories/ITeacherRepository';

@injectable()
class CreateWeekClassUserService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(
    id: string,
    name: string,
    ssn: string,
  ): Promise<TeacherWeekClassUsers> {
    const classUser = await this.teachersRepository.createWeekClassUser(
      id,
      name,
      ssn,
    );

    return classUser;
  }
}

export default CreateWeekClassUserService;
