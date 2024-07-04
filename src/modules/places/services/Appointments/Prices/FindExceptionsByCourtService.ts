import { injectable, inject } from 'tsyringe';

import AppointmentsPricesExceptions from '../../../infra/typeorm/entities/Appointments/AppointmentsPricesExceptions';
import IAppointmentsRepository from '../../../repositories/Appointments/IAppointmentsRepository';

@injectable()
class CreatePriceExceptionService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(
    id_court: string,
  ): Promise<AppointmentsPricesExceptions[]> {
    const priceExceptions =
      await this.appointmentsRepository.findAllExceptionsByCourt(id_court);

    return priceExceptions;
  }
}

export default CreatePriceExceptionService;
