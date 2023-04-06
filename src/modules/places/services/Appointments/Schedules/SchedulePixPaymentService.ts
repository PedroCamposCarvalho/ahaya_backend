import { injectable, inject } from 'tsyringe';
import axios from 'axios';
import { differenceInMinutes, addHours } from 'date-fns';
import keys from '@modules/payments/keys';
import IAppointmentsRepository from '../../../repositories/Appointments/IAppointmentsRepository';

@injectable()
class SchedulePixPaymentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(): Promise<void> {
    const appointments =
      await this.appointmentsRepository.findAllUnpaidAppointments();
    const hoursToAdd = String(process.env.ENV === 'dev') ? -3 : -1;
    appointments.map(async item => {
      if (
        differenceInMinutes(new Date(), addHours(item.created_at, hoursToAdd)) >
        30
      ) {
        await this.appointmentsRepository.deleteAppointment(item.id);
      } else {
        axios
          .get(
            `https://app.vindi.com.br/api/v1/charges/${item.id_transaction}`,
            {
              auth: {
                username: keys().production_private_key,
                password: '',
              },
            },
          )
          .then(response => {
            if (String(response.data.charge.status) === 'paid') {
              this.appointmentsRepository.updatePaidAppointment(item.id);
            }
          })
          .catch();
      }
    });
  }
}

export default SchedulePixPaymentService;
