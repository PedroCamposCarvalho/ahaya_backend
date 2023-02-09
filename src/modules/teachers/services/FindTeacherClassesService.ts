import { injectable, inject } from 'tsyringe';
import ITeacherRepository from '../repositories/ITeacherRepository';
import ITeachersClassesDTO from '../dtos/ITeachersClassesDTO';

interface IWeekObject {
  day_of_week: string;
  hours: ITeachersClassesDTO[];
}

@injectable()
class FindTeacherClassesService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(id_teacher: string): Promise<IWeekObject[]> {
    function getDayDescription(day: number): string {
      if (day === 0) {
        return 'Domingo';
      }
      if (day === 1) {
        return 'Segunda';
      }
      if (day === 2) {
        return 'Terça';
      }
      if (day === 3) {
        return 'Quarta';
      }
      if (day === 4) {
        return 'Quinta';
      }
      if (day === 5) {
        return 'Sexta';
      }
      return 'Sabado';
    }

    const returnObject: IWeekObject[] = [];

    const days = [0, 1, 2, 3, 4, 5, 6];

    const classes = await this.teachersRepository.findTeacherClass(id_teacher);

    days.map(day => {
      const newObject: IWeekObject = {
        day_of_week: getDayDescription(day),
        hours: classes.filter(item => item.day_of_week === day),
      };

      returnObject.push(newObject);
      return null;
    });

    return returnObject;
  }
}

export default FindTeacherClassesService;
