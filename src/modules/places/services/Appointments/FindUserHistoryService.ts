import { injectable, inject } from 'tsyringe';

import Appointment from '../../infra/typeorm/entities/Appointments/Appointment';
import IAppointmentsRepository from '../../repositories/Appointments/IAppointmentsRepository';
import IFindUserHistoryFiltersDTO from '../../dtos/Appointments/IFindUserHistoryFiltersDTO';

@injectable()
class FindUserHistoryService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(
    data: IFindUserHistoryFiltersDTO,
  ): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findUserHistory(
      data,
    );

    return appointments;
  }
}

export default FindUserHistoryService;
