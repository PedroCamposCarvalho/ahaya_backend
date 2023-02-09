/* eslint-disable no-unused-expressions */
import { injectable, inject } from 'tsyringe';
import { addDays } from 'date-fns';
import IReturnCalendarEvents from '@modules/places/dtos/Appointments/IReturnCalendarDTO';
import getCourtColor from '@modules/places/services/Appointments/utils/getCourtColor';
import IGetCourtsDTO from '@modules/places/dtos/Courts/IGetCourtsDTO';
import ICourtsRepository from '@modules/places/repositories/Courts/ICourtsRepository';
import IMonthlyRepository from '../repositories/IMonthlyRepository';

@injectable()
class FindUserMonthlyService {
  constructor(
    @inject('MonthlyRepository')
    private monthlyRepository: IMonthlyRepository,
    @inject('CourtsRepository')
    private courtsRepository: ICourtsRepository,
  ) {}

  private formatDate(dayOfWeek: number, monthlyHour: number): string {
    const hour = String(monthlyHour).padStart(2, '0');

    const minutes = '00';
    let tempDay = 0;
    if (dayOfWeek === 1) {
      tempDay = 17;
    } else if (dayOfWeek === 2) {
      tempDay = 18;
    } else if (dayOfWeek === 3) {
      tempDay = 19;
    } else if (dayOfWeek === 4) {
      tempDay = 20;
    } else if (dayOfWeek === 5) {
      tempDay = 21;
    } else if (dayOfWeek === 6) {
      tempDay = 22;
    }

    const day = String(tempDay).padStart(2, '0');
    const month = '07';
    const year = '2022';

    return `${year}-${month}-${day}T${hour}:${minutes}:00`;
  }

  private getNextDay(currentDate: Date, dayOfWeek: number): Date {
    const now = new Date(currentDate);
    now.setDate(now.getDate() + ((dayOfWeek + (7 - now.getDay())) % 7));
    return now;
  }

  private getCourtIndex(courts: IGetCourtsDTO[], id_court: string): number {
    let index = -1;
    courts.map((court, i) => {
      if (court.id === id_court) {
        index = i;
      }
      return null;
    });
    return index;
  }

  public async execute(id_place: string): Promise<IReturnCalendarEvents[]> {
    const events: IReturnCalendarEvents[] = [];
    const courts = await this.courtsRepository.getAll(id_place);
    const monthly = await this.monthlyRepository.findAll();
    monthly.map(item => {
      let currentDate = new Date();
      currentDate.setHours(item.hour);
      currentDate.setMinutes(0);

      const newEvent: IReturnCalendarEvents = {
        id: item.id,
        id_court: item.id_court,
        title: `${item.user_name} - Mensal`,
        start: this.formatDate(item.day_of_week, item.hour),
        end: this.formatDate(item.day_of_week, item.hour + 1),
        color: getCourtColor(this.getCourtIndex(courts, item.id_court)),
        type: 3,
      };
      events.push(newEvent);
      currentDate = addDays(currentDate, 7);

      return null;
    });
    return events;
  }
}

export default FindUserMonthlyService;
