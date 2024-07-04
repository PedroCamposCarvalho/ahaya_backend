import { injectable, inject } from 'tsyringe';

import AppointmentPrice from '../../../infra/typeorm/entities/Appointments/AppointmentPrice';
import IAppointmentsRepository from '../../../repositories/Appointments/IAppointmentsRepository';

@injectable()
class DeletePriceService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(id: string): Promise<AppointmentPrice> {
    const price = await this.appointmentsRepository.deletePrice(id);

    return price;
  }
}

export default DeletePriceService;
