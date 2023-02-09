import { injectable, inject } from 'tsyringe';
import TeacherClassUser from '../infra/typeorm/entities/TeacherClassUser';
import ITeacherRepository from '../repositories/ITeacherRepository';
import ICreateClassUserDTO from '../dtos/ICreateClassUserDTO';

@injectable()
class CreateClassUserService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(data: ICreateClassUserDTO): Promise<TeacherClassUser> {
    const userClass = this.teachersRepository.createClassUser(data);

    return userClass;
  }
}

export default CreateClassUserService;
