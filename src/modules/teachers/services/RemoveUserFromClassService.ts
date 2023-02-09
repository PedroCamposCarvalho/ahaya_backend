import { injectable, inject } from 'tsyringe';
import ITeacherRepository from '../repositories/ITeacherRepository';

@injectable()
class RemoveUserFromClassService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(id_user: string, id_class: string): Promise<boolean> {
    const userClass = await this.teachersRepository.removeUserFromClass(
      id_user,
      id_class,
    );

    return userClass;
  }
}

export default RemoveUserFromClassService;
