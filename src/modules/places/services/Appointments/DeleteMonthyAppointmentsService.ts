import { injectable, inject } from 'tsyringe';
import Appointment from '../../infra/typeorm/entities/Appointments/Appointment';
import IAppointmentsRepository from '../../repositories/Appointments/IAppointmentsRepository';

@injectable()
class DeleteMonthyAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(id_appointment: string): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findMonthlyAppointments(
      id_appointment,
    );

    return appointments;
  }
}

export default DeleteMonthyAppointmentsService;
