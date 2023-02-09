import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../../repositories/Appointments/IAppointmentsRepository';
import IFindAppointmentsMaterialsDTO from '../../dtos/Appointments/IFindAppointmentsMaterialsDTO';

@injectable()
class FindAppointmentMaterialsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(
    id_appointment: string,
  ): Promise<IFindAppointmentsMaterialsDTO[]> {
    const materials =
      await this.appointmentsRepository.findAppointmentMaterials(
        id_appointment,
      );

    return materials;
  }
}

export default FindAppointmentMaterialsService;
