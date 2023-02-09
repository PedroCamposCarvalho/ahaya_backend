import { injectable, inject } from 'tsyringe';
import TeacherClassUser from '../infra/typeorm/entities/TeacherClassUser';
import ITeacherRepository from '../repositories/ITeacherRepository';

@injectable()
class FindUsersByClassService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(id_class: string): Promise<TeacherClassUser[]> {
    const users = this.teachersRepository.findUsersByClass(id_class);

    return users;
  }
}

export default FindUsersByClassService;
