import { injectable, inject } from 'tsyringe';

import AppointmentsPricesExceptions from '../../../infra/typeorm/entities/Appointments/AppointmentsPricesExceptions';
import IAppointmentsRepository from '../../../repositories/Appointments/IAppointmentsRepository';

@injectable()
class DeletePriceExceptionService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(id: string): Promise<AppointmentsPricesExceptions> {
    const priceExceptions =
      await this.appointmentsRepository.deletePriceException(id);

    return priceExceptions;
  }
}

export default DeletePriceExceptionService;
