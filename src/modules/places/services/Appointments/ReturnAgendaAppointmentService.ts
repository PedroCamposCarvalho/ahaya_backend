import { injectable, inject } from 'tsyringe';

import IReturnAgendaAppointmentDTO, {
  IMaterialsProps,
} from '../../dtos/Appointments/IReturnAgendaAppointmentDTO';
import IAppointmentsRepository from '../../repositories/Appointments/IAppointmentsRepository';

@injectable()
class ReturnAgendaAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(
    id_appointment: string,
  ): Promise<IReturnAgendaAppointmentDTO> {
    try {
      const appointment =
        await this.appointmentsRepository.findAppointmentForAgenda(
          id_appointment,
        );

      const materials =
        await this.appointmentsRepository.findAppointmentMaterials(
          id_appointment,
        );

      if (materials.length > 0) {
        const tempMaterials: IMaterialsProps[] = [];
        materials.map(item => {
          tempMaterials.push({
            material_name: item.material,
            amount: Number(item.amount),
          });
        });
        appointment.materials = tempMaterials;
      }

      return appointment;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}

export default ReturnAgendaAppointmentService;
