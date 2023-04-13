import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../../infra/typeorm/entities/Appointments/Appointment';
import IAppointmentsRepository from '../../repositories/Appointments/IAppointmentsRepository';

@injectable()
class UpdatePixPaymentPaidService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(id_transaction: string): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findByIdTransaction(
      id_transaction,
    );

    if (!appointment) {
      throw new AppError('Appointment not found');
    }

    appointment.paid = true;

    await this.appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default UpdatePixPaymentPaidService;
