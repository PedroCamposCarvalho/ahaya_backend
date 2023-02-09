import { injectable, inject } from 'tsyringe';

import AppointmentPrice from '../../../infra/typeorm/entities/Appointments/AppointmentPrice';
import IAppointmentsRepository from '../../../repositories/Appointments/IAppointmentsRepository';
import IEditPriceDTO from '../../../dtos/Appointments/IEditPriceDTO';

@injectable()
class EditPriceService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(data: IEditPriceDTO): Promise<AppointmentPrice> {
    const price = await this.appointmentsRepository.editPrice(data);

    return price;
  }
}

export default EditPriceService;
