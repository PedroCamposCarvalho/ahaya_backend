import { injectable, inject } from 'tsyringe';
import IEditAppointmentDTO from '../../dtos/Appointments/IEditAppointmentDTO';
import IAppointmentsRepository from '../../repositories/Appointments/IAppointmentsRepository';
import Appointment from '../../infra/typeorm/entities/Appointments/Appointment';

@injectable()
class DeleteAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(data: IEditAppointmentDTO): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.editAppointment(data);

    return appointment;
  }
}

export default DeleteAppointmentService;
