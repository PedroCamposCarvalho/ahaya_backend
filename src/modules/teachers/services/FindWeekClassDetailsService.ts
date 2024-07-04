import { injectable, inject } from 'tsyringe';
import ITeacherRepository from '../repositories/ITeacherRepository';
import IReturnWeekClassDetailDTO from '../dtos/IReturnWeekClassDetailDTO';

@injectable()
class FindWeekClassDetailsService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(id_week: string): Promise<IReturnWeekClassDetailDTO> {
    const classDetail = await this.teachersRepository.findWeekClassDetails(
      id_week,
    );
    const users = await this.teachersRepository.findWeekClassUsers(id_week);

    classDetail.users = users;

    return classDetail;
  }
}

export default FindWeekClassDetailsService;
