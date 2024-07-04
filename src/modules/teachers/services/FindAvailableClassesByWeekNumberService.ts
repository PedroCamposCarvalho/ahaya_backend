import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ITeacherRepository from '../repositories/ITeacherRepository';
import IFindHoursDTO from '../dtos/IFindHoursDTO';

interface IReturnObject {
  hour: number;
  classes: IFindHoursDTO[];
}

@injectable()
class FindAvailableClassesByWeekNumberService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    week_number: number,
    ssn: string,
    id_user: string,
  ): Promise<IReturnObject[]> {
    try {
      const finalArray: IReturnObject[] = [];

      const hours = [
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
      ];

      const classes = await this.teachersRepository.findAvailableClassesByWeekNumber(
        week_number,
      );

      const usersWeekClasses = await this.teachersRepository.findUsersWeekClasses(
        ssn,
      );

      const usersClasses = await this.teachersRepository.findUsersClasses(ssn);

      const usersCategory = await this.usersRepository.findAllUserCategories(
        id_user,
      );

      const newClasses: IFindHoursDTO[] = [];

      classes.map(item => {
        const newClassObject: IFindHoursDTO = {
          id: item.id,
          id_class: item.id_class,
          id_week: item.id_week,
          id_sport: item.id_sport,
          sport_name: item.sport_name,
          category: item.category,
          strength: item.strength,
          court_name: item.court_name,
          teacher_name: item.teacher_name,
          hour: item.hour,
          photo_url: item.photo_url,
          price: item.price,
          limit: item.limit,
          is_user_in_list:
            usersWeekClasses.filter(weekClass => weekClass.id_week === item.id)
              .length > 0,
          is_recurrent:
            usersClasses.filter(
              teacherClass => teacherClass.id_teacherclass === item.id_class,
            ).length > 0,
          users_in_list: item.users_in_list,
          show_to_user:
            usersCategory.filter(item2 => item2.id_sport === item.id_sport)[0]
              .strength <= item.strength,
        };

        newClasses.push(newClassObject);
        return null;
      });

      hours.map(hour => {
        const newObject: IReturnObject = {
          hour,
          classes: newClasses.filter(newClass => newClass.hour === hour),
        };
        finalArray.push(newObject);
        return null;
      });

      return finalArray;
    } catch (error) {
      throw new Error();
    }
  }
}

export default FindAvailableClassesByWeekNumberService;
