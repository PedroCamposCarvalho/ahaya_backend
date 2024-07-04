import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../../repositories/Appointments/IAppointmentsRepository';

@injectable()
class DeleteAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(id_appointment: string): Promise<boolean> {
    const appointment = await this.appointmentsRepository.deleteAppointment(
      id_appointment,
    );

    return appointment;
  }
}

export default DeleteAppointmentService;
