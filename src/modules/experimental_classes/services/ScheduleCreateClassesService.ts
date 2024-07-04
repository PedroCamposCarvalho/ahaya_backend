/* eslint-disable func-names */
import { injectable, inject } from 'tsyringe';
import { addDays, addMinutes } from 'date-fns';
import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class ScheduleCreateClassesService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(): Promise<void> {
    try {
      const configDays =
        await this.experimentalClassRepository.findAllConfigDays();

      const createdClasses =
        await this.experimentalClassRepository.findCreatedClasses();

      const exceptionsDays =
        await this.experimentalClassRepository.findAllExceptions();

      console.log(configDays);

      const now = new Date();

      configDays.map(item => {
        for (let i = 1; i < 15; i++) {
          const newDate = addDays(now, i);
          for (let j = 0; j <= 23; j++) {
            for (let k = 0; k <= 60; k++) {
              if (
                k === item.minutes &&
                j === item.hour &&
                newDate.getDay() === item.week_number
              ) {
                const constructedDate = new Date(
                  newDate.getFullYear(),
                  newDate.getMonth(),
                  newDate.getDate(),
                  j,
                  k,
                  0,
                  0,
                );

                let exceptionDateIndex = -1;
                exceptionsDays.map((e, index) => {
                  if (
                    e.date.getDate() === constructedDate.getDate() &&
                    e.date.getMonth() === constructedDate.getMonth() &&
                    e.date.getFullYear() === constructedDate.getFullYear() &&
                    e.id_place === item.id_place &&
                    e.hour === j
                  ) {
                    exceptionDateIndex = index;
                  }
                  return null;
                });

                if (exceptionDateIndex === -1) {
                  const createdClassIndex = createdClasses
                    .map(function (e) {
                      return e.start_date.toDateString();
                    })
                    .indexOf(constructedDate.toDateString());
                  if (createdClassIndex === -1) {
                    const newClass = {
                      id_place: item.id_place,
                      price: item.price,
                      start_date: constructedDate,
                      finish_date: addMinutes(constructedDate, 30),
                      limit: item.limit,
                    };
                    this.experimentalClassRepository.createByClassesConfig(
                      newClass,
                    );
                  }
                }
              }
            }
          }
        }
        return null;
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default ScheduleCreateClassesService;
