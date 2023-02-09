import { injectable, inject } from 'tsyringe';

import ITeacherRepository from '../repositories/ITeacherRepository';

@injectable()
class ScheduleCreateClassService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(): Promise<void> {
    function nextDate(dayIndex: number): Date {
      const today = new Date();
      today.setDate(
        today.getDate() + ((dayIndex - 1 - today.getDay() + 7) % 7) + 1,
      );
      return today;
    }
    const today = new Date();

    const classes = await this.teachersRepository.findAllClasses();

    const weekClasses = await this.teachersRepository.findThisWeekClasses();

    for (let i = 0; i < 7; i++) {
      const filteredClasses = classes.filter(item => item.day_of_week === i);
      const filteredWeekClasses = weekClasses.filter(
        item => item.start_date.getDay() === i,
      );
      filteredClasses.map(item => {
        if (
          filteredWeekClasses
            .map(function temp(e) {
              return e.id_class;
            })
            .indexOf(item.id) === -1
        ) {
          if (today.getDay() === i) {
            const data = {
              id_class: item.id,
              start_date: new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),

                item.hour,
              ),
            };

            this.teachersRepository.createWeekClass(data);
          } else {
            const data = {
              id_class: item.id,
              start_date: new Date(
                nextDate(i).getFullYear(),
                nextDate(i).getMonth(),
                nextDate(i).getDate(),

                item.hour,
              ),
            };

            this.teachersRepository.createWeekClass(data);
          }
        }
        return null;
      });
    }
  }
}

export default ScheduleCreateClassService;
