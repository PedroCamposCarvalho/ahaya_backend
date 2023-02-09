import { injectable, inject } from 'tsyringe';
import { addHours, addDays } from 'date-fns';
import ITeacherRepository from '@modules/teachers/repositories/ITeacherRepository';
import IMonthlyRepository from '@modules/monthly/repositories/IMonthlyRepository';
import IReturnCalendarEvents, {
  IClassUsersDTO,
} from '../../../dtos/Appointments/IReturnCalendarDTO';
import IGetCourtsDTO from '../../../dtos/Courts/IGetCourtsDTO';
import IAppointmentsRepository from '../../../repositories/Appointments/IAppointmentsRepository';
import ICourtsRepository from '../../../repositories/Courts/ICourtsRepository';
import getCourtColor from '../utils/getCourtColor';

@injectable()
class FindByTransactionIdService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
    @inject('MonthlyRepository')
    private monthlyRepository: IMonthlyRepository,
    @inject('CourtsRepository')
    private courtsRepository: ICourtsRepository,
  ) {}

  private formatDate(date: Date): string {
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

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
    try {
      const appointments = await this.appointmentsRepository.findAll();

      const classes = await this.teachersRepository.findAllWeekClasses();

      const classesUsers = await this.teachersRepository.findAllClassesUsers();

      const monthly = await this.monthlyRepository.findAll();

      const courts = await this.courtsRepository.getAll(id_place);

      const events: IReturnCalendarEvents[] = [];

      monthly.map(item => {
        let currentDate = new Date();
        currentDate.setHours(item.hour);
        currentDate.setMinutes(0);
        for (let i = 0; i < 52; i++) {
          const nextDay = this.getNextDay(
            new Date(currentDate),
            item.day_of_week,
          );
          const newEvent: IReturnCalendarEvents = {
            id: item.id,
            id_court: item.id_court,
            title: `${item.user_name} - Mensal`,
            start: this.formatDate(new Date(nextDay)),
            end: this.formatDate(new Date(addHours(nextDay, 1))),
            color: getCourtColor(this.getCourtIndex(courts, item.id_court)),
            type: 3,
          };
          events.push(newEvent);
          currentDate = addDays(currentDate, 7);
        }
        return null;
      });

      appointments.map(item => {
        const newEvent: IReturnCalendarEvents = {
          id: item.id,
          id_court: item.id_court,
          title:
            item.observation === '' ? 'teste' : `${item.observation} - App`,
          start: this.formatDate(new Date(item.start_date)),
          end: this.formatDate(new Date(item.finish_date)),
          color: getCourtColor(this.getCourtIndex(courts, item.id_court)),
          type: 1,
          appointmentDetail: {
            price: item.price,
            id_transaction: item.id_transaction,
            canceled: item.canceled,
          },
        };
        events.push(newEvent);
        return null;
      });

      classes.map(item => {
        const userClasses: IClassUsersDTO[] = classesUsers.filter(
          item2 => item2.id_week === item.id_week,
        );
        const newEvent: IReturnCalendarEvents = {
          id: item.id_week,
          id_court: item.id_court,
          title: `${item.teacher_name} - Aula`,
          start: this.formatDate(new Date(item.start_date)),
          end: this.formatDate(new Date(addHours(item.start_date, 1))),
          color: getCourtColor(this.getCourtIndex(courts, item.id_court)),
          type: 2,
          classUsers: userClasses,
        };
        events.push(newEvent);
        return null;
      });

      return events;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}

export default FindByTransactionIdService;
