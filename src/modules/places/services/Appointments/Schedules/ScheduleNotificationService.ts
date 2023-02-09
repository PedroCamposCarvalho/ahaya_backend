import { injectable, inject } from 'tsyringe';
import { differenceInMinutes, addHours, parseISO } from 'date-fns';
import SpecificsNotification from '../../../../store/providers/SpecificsNotification';
import IAppointmentsRepository from '../../../repositories/Appointments/IAppointmentsRepository';

@injectable()
class ScheduleNotificationService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(): Promise<void> {
    const now = new Date();
    const data = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
    };

    const appointments = await this.appointmentsRepository.findAllInDayToNotify(
      data,
    );
    console.log(appointments);

    // appointments.map(async (appointment, index) => {
    //   if (
    //     differenceInMinutes(
    //       addHours(now.setSeconds(0), -2),
    //       new Date(appointment.start_date).setSeconds(0),
    //     ) === 30
    //   ) {
    //     if (index === 0) {
    //       await SpecificsNotification(
    //         [appointment.one_signal_id],
    //         'Estamos te esperando!',
    //         'Em 30 minutos começa a sua reserva :)',
    //       );
    //     }
    //     if (
    //       index > 0 &&
    //       appointment.one_signal_id !== appointments[index - 1].one_signal_id
    //     ) {
    //       await SpecificsNotification(
    //         [appointment.one_signal_id],
    //         'Estamos te esperando!',
    //         'Em 30 minutos começa a sua reserva :)',
    //       );
    //     }
    //   }
    // });
  }
}

export default ScheduleNotificationService;
