/* eslint-disable no-unused-expressions */
import { injectable, inject } from 'tsyringe';
import IReturnFindAllDTO, {
  IAppointmentProps,
} from '@modules/monthly/dtos/IReturnFindAllDTO';
import IAppointmentsRepository from '@modules/places/repositories/Appointments/IAppointmentsRepository';
import IMonthlyRepository from '../repositories/IMonthlyRepository';

@injectable()
class FindAllAvailableDaysService {
  constructor(
    @inject('MonthlyRepository')
    private monthlyRepository: IMonthlyRepository,

    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(): Promise<IReturnFindAllDTO[]> {
    const availableDays = await this.monthlyRepository.findAllAvailableDays();

    const appointments = await this.appointmentsRepository.findNextAppointmentsService();

    const hoursToAdd = process.env.ENV === 'dev' ? 3 : 1;

    availableDays.map(day => {
      const filteredAppointments = appointments.filter(
        appo =>
          new Date(appo.start_date).getDay() === day.week_day &&
          new Date(appo.start_date).getHours() + hoursToAdd === day.hour &&
          appo.id_court === day.id_court,
      );
      if (filteredAppointments.length > 0) {
        const appointmentInDay: IAppointmentProps = {
          id: filteredAppointments[0].id,
          start_date: filteredAppointments[0].start_date,
        };

        day.appointmentInDay = appointmentInDay;
      }
      return null;
    });

    return availableDays;
  }
}

export default FindAllAvailableDaysService;
