import { injectable, inject } from 'tsyringe';
import { isAfter } from 'date-fns';

import getHalfHour from '../utils/getHalfHour';
import IReturnAvailableHoursDTO, {
  ICourts,
} from '../../../dtos/Appointments/IReturnAvailableHoursDTO';
import IAppointmentsRepository from '../../../repositories/Appointments/IAppointmentsRepository';
import ICourtsRepository from '../../../repositories/Courts/ICourtsRepository';
import Appointment from '../../../infra/typeorm/entities/Appointments/Appointment';

interface IServiceParams {
  day: number;
  month: number;
  year: number;
  id_place: string;
  id_sport: string;
}

@injectable()
class FindDayAvailabilityServiceCalango {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('CourtsRepository')
    private courtsRepository: ICourtsRepository,
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

    if (hour % 1 !== 0) {
      filteredAppointments.map(item => {
        const initialHour = new Date(item.start_date).getHours();
        const initialMinutes = new Date(item.start_date).getMinutes();
        const hourToCompare = Number(String(hour).split('.')[0]);
        const hourMinutes = Number(String(hour).split('.')[1]) + 27;

        if (hourToCompare === initialHour) {
          if (initialMinutes === hourMinutes) available = false;
        }

        return null;
      });

      return available;
    }
    filteredAppointments.map(item => {
      const initialHour = new Date(item.start_date).getHours();

      if (hour === initialHour) {
        available = false;
      }

      return null;
    });

    return available;
  }

  private isVacations(dayOfWeek: number, hour: number): boolean {
    if (String(process.env.CLIENT) === 'Ahaya') {
      if (dayOfWeek === 0) {
        return true;
      }
      if (dayOfWeek === 6 && hour >= 18) {
        return true;
      }
      return false;
    }
    return false;
  }

  private getPrice(dayOfWeek: number): number {
    if (dayOfWeek === 0) {
      return 320;
    }
    if (dayOfWeek === 6) {
      return 250;
    }
    return 150;
  }

  public async execute(
    data: IServiceParams,
  ): Promise<IReturnAvailableHoursDTO[]> {
    try {
      const { day, month, year, id_place, id_sport } = data;

      const selectedDate = new Date(year, month - 1, day);

      const hours = getHalfHour(selectedDate.getDay());

      const appointments = await this.appointmentsRepository.findAllInDay({
        day,
        month,
        year,
        id_place,
        id_sport,
      });

      const courts = await (
        await this.courtsRepository.findCourtsBySportId(id_sport)
      ).filter(item => item.id_place === id_place);

      const currentDate = new Date();

      const availableHours: IReturnAvailableHoursDTO[] = [];

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
              !this.isVacations(selectedDate.getDay(), hour),
            price: this.getPrice(selectedDate.getDay()),
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
      throw new Error();
    }
  }
}

export default FindDayAvailabilityServiceCalango;
