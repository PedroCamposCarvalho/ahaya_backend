import { injectable, inject } from 'tsyringe';
import IReturnFindUserClassesDTO from '../dtos/IReturnFindUserClassesDTO';
import ITeacherRepository from '../repositories/ITeacherRepository';

@injectable()
class FindUsersClassesService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(ssn: string): Promise<IReturnFindUserClassesDTO[]> {
    const users = this.teachersRepository.findUsersClasses(ssn);

    return users;
  }
}

export default FindUsersClassesService;
