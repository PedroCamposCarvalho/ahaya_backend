import { injectable, inject } from 'tsyringe';

import AppointmentsPricesExceptions from '../../../infra/typeorm/entities/Appointments/AppointmentsPricesExceptions';
import IAppointmentsRepository from '../../../repositories/Appointments/IAppointmentsRepository';
import ICreatePriceExceptionDTO from '../../../dtos/Appointments/ICreatePriceExceptionDTO';

@injectable()
class CreatePriceExceptionService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(
    data: ICreatePriceExceptionDTO,
  ): Promise<AppointmentsPricesExceptions> {
    const priceException =
      await this.appointmentsRepository.createPriceException(data);

    return priceException;
  }
}

export default CreatePriceExceptionService;
