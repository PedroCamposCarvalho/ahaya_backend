import { injectable, inject } from 'tsyringe';

import AppointmentPrice from '../../../infra/typeorm/entities/Appointments/AppointmentPrice';
import IAppointmentsRepository from '../../../repositories/Appointments/IAppointmentsRepository';
import ICreatePriceDTO from '../../../dtos/Appointments/ICreatePriceDTO';

@injectable()
class CreatePriceService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(data: ICreatePriceDTO): Promise<AppointmentPrice> {
    const price = await this.appointmentsRepository.createPrice(data);

    return price;
  }
}

export default CreatePriceService;
