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

    filteredAppointments.forEach(item => {
      const initialHour = new Date(item.start_date).getHours();
      const finishHour = new Date(item.finish_date).getHours();
      for (let i = initialHour; i < finishHour; i++) {
        if (i === hour) {
          available = false;
        }
      }
    });

    return available;
  }

  private isVacations(weekDay: number, day: number, month: number): boolean {
    if (String(process.env.CLIENT) === 'Ahaya') {
      if (weekDay === 0) {
        return true;
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
      const courts = (
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

      const availableHours: IReturnAvailableHoursDTO[] = [];

      hours.forEach(hour => {
        const newItemProps: ICourts[] = courts.map(court => ({
          id: court.id,
          court_name: court.name,
          court_photo: court.photo,
          available:
            isAfter(selectedDate.setHours(hour), currentDate) &&
            this.verifyAppointmentExistInHour(appointments, hour, court.id) &&
            !this.isVacations(
              selectedDate.getDay(),
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
              prices.find(
                item =>
                  item.hour === hour &&
                  item.week_day === selectedDate.getDay() &&
                  item.id_court === court.id,
              )?.price,
            ) || 0,
        }));
        const newItem: IReturnAvailableHoursDTO = {
          hour,
          props: newItemProps,
        };
        availableHours.push(newItem);
      });

      return availableHours;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}

export default FindDayAvailabilityService;
