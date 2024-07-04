import { injectable, inject } from 'tsyringe';
import ITeacherRepository from '@modules/teachers/repositories/ITeacherRepository';
import TeacherWeekClassUsers from '@modules/teachers/infra/typeorm/entities/TeacherWeekClassUsers';
import IUsePackageToClassServiceDTO from '../dtos/IUsePackageToClassServiceDTO';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class UsePackageToClassService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(
    data: IUsePackageToClassServiceDTO,
  ): Promise<TeacherWeekClassUsers> {
    const { id_week, id_user, name, ssn } = data;
    const weekClass = await this.teachersRepository.createWeekClassUser(
      id_week,
      name,
      ssn,
    );

    await this.payersRepository.createHistory(id_user, 1);

    return weekClass;
  }
}

export default UsePackageToClassService;
