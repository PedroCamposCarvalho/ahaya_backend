import { injectable, inject } from 'tsyringe';
import ICourtsRepository from '@modules/places/repositories/Courts/ICourtsRepository';
import IFindAvailableCourtsToCreateClassDTO from '../dtos/IFindAvailableCourtsToCreateClassDTO';
import IReturnFindAvailableCourtsToCreateClassDTO from '../dtos/IReturnFindAvailableCourtsToCreateClassDTO';
import ITeacherRepository from '../repositories/ITeacherRepository';

@injectable()
class FindAvailableCourtsToCreateClassService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
    @inject('CourtsRepository')
    private courtsRepository: ICourtsRepository,
  ) {}

  public async execute(
    data: IFindAvailableCourtsToCreateClassDTO,
  ): Promise<IReturnFindAvailableCourtsToCreateClassDTO[]> {
    const { id_sport, day_of_week, hour } = data;
    const courts = await this.courtsRepository.findCourtsBySportId(id_sport);

    const classes = await this.teachersRepository.findClassesByHourAndWeekDay(
      day_of_week,
      hour,
    );

    const tempArray: string[] = [];

    courts.map(item => {
      tempArray.push(item.id);
      return null;
    });

    classes.map(item => {
      const index = tempArray.indexOf(item.id_court);

      if (index > -1) {
        tempArray.splice(index, 1);
      }
      return null;
    });

    const arrayToReturn: IReturnFindAvailableCourtsToCreateClassDTO[] = [];

    tempArray.map(item => {
      let court_name = '';
      courts.map(court => {
        if (court.id === item) {
          court_name = court.name;
        }
        return null;
      });

      arrayToReturn.push({
        id_court: item,
        court_name,
      });
      return null;
    });

    return arrayToReturn;
  }
}

export default FindAvailableCourtsToCreateClassService;
