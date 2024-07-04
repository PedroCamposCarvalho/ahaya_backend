import { injectable, inject } from 'tsyringe';

import AppointmentPrice from '../../../infra/typeorm/entities/Appointments/AppointmentPrice';
import IAppointmentsRepository from '../../../repositories/Appointments/IAppointmentsRepository';

@injectable()
class FindPricesByCourt {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(id_court: string): Promise<AppointmentPrice[]> {
    const prices = await this.appointmentsRepository.findPricesByCourt(
      id_court,
    );

    return prices;
  }
}

export default FindPricesByCourt;
