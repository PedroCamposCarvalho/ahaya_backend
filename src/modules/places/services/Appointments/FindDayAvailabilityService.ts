import { injectable, inject } from 'tsyringe';
import { isAfter } from 'date-fns';

import getWorkingHours from './utils/getWorkingHours';
import IReturnAvailableHoursDTO, {
  ICourts,
} from '../../dtos/Appointments/IReturnAvailableHoursDTO';
import IAppointmentsRepository from '../../repositories/Appointments/IAppointmentsRepository';
import ICourtsRepository from '../../repositories/Courts/ICourtsRepository';
import IMonthlyRepository from '../../../monthly/repositories/IMonthlyRepository';
import IMonthlyUserMissedDaysRepository from '../../../monthly/repositories/IMonthlyUserMissedDaysRepository';
import Appointment from '../../infra/typeorm/entities/Appointments/Appointment';

interface IServiceParams {
  day: number;
  month: number;
  year: number;
  id_place: string;
  id_sport: string;
}

@injectable()
class FindDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('CourtsRepository')
    private courtsRepository: ICourtsRepository,
    @inject('MonthlyRepository')
    private monthlyRepository: IMonthlyRepository,
    @inject('MonthlyUserMissedDaysRepository')
    private monthlyUserMissedDaysRepositoryRepository: IMonthlyUserMissedDaysRepository,
  ) {}

  private verifyAppointmentExistInHour(
    appointments: Appointment[],
    hour: number,
    id_court: string,
  ): boolean {
    const filteredAppointments = appointments.filter(
      item => item.id_court === id_court,
    );

    let available = true;

    filteredAppointments.map(item => {
      const initialHour = new Date(item.start_date).getHours();
      const finishHour = new Date(item.finish_date).getHours();

      for (let i = initialHour; i < finishHour; i++) {
        if (i === hour) {
          available = false;
        }
      }
      return null;
    });

    return available;
  }

 // private isVacations(day: number, month: number): boolean {
   // if (String(process.env.CLIENT) === 'Ahaya') {
    //  if (month === 11 || month === 0) {
   private isVacations(day: number, month: number): boolean {
    if (String(process.env.CLIENT) === 'Ahaya') {
      if (month === 11) {
        if (day >= 24) {
          return true;
        }
      } else if (month === 0) {
        if (day <= 2) {
          return true;
        }
      } else {
        return false;
      }
    }
    return false;
  }

  public async execute(
    data: IServiceParams,
  ): Promise<IReturnAvailableHoursDTO[]> {
    try {
      const { day, month, year, id_place, id_sport } = data;

      const appointments = await this.appointmentsRepository.findAllInDay(data);

      const prices = await this.appointmentsRepository.findAllPrices();

      const courts = await (
        await this.courtsRepository.findCourtsBySportId(id_sport)
      ).filter(item => item.id_place === id_place);

      const monthly = await this.monthlyRepository.findAll();

      const missedDays =
        await this.monthlyUserMissedDaysRepositoryRepository.findAllByDate(
          day,
          month,
          year,
        );

      const currentDate = new Date();

      const selectedDate = new Date(year, month - 1, day);

      const hours = getWorkingHours(selectedDate.getDay());

      const exceptionDays =
        await this.appointmentsRepository.findExceptionsByWeekDay(
          selectedDate.getDay(),
        );

      const availableHours: IReturnAvailableHoursDTO[] = [];

      const filteredExceptions = exceptionDays.filter(
        i => i.date.toLocaleDateString() === selectedDate.toLocaleDateString(),
      );

      hours.map(hour => {
        const hourProps: ICourts[] = [];
        const newItem: IReturnAvailableHoursDTO =
          {} as IReturnAvailableHoursDTO;
        courts.map(court => {
          const newItemProps: ICourts = {
            id: court.id,
            court_name: court.name,
            available:
              isAfter(selectedDate.setHours(hour), currentDate) &&
              this.verifyAppointmentExistInHour(appointments, hour, court.id) &&
              !this.isVacations(
                selectedDate.getDate(),
                selectedDate.getMonth(),
              ) &&
              monthly.filter(
                item =>
                  item.id_court === court.id &&
                  item.hour === hour &&
                  item.day_of_week === selectedDate.getDay() &&
                  isAfter(selectedDate, item.start_date) &&
                  missedDays.filter(item2 => item2.id_monthly === item.id)
                    .length === 0,
              ).length === 0,

            price:
              Number(
                filteredExceptions.filter(
                  i => i.hour === hour && i.id_court === court.id,
                )[0]?.new_price,
              ) ||
              Number(
                prices.filter(
                  item =>
                    item.hour === hour &&
                    item.week_day === selectedDate.getDay() &&
                    item.id_court === court.id,
                )[0]?.price,
              ) ||
              0,
          };
          hourProps.push(newItemProps);
          return null;
        });
        newItem.hour = hour;
        newItem.props = hourProps;
        availableHours.push(newItem);
        return null;
      });

      return availableHours;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}

export default FindDayAvailabilityService;
