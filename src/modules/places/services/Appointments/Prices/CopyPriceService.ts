import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../../../repositories/Appointments/IAppointmentsRepository';
import ICopyPriceDTO from '../../../dtos/Appointments/ICopyPriceDTO';

@injectable()
class CopyPriceService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(data: ICopyPriceDTO): Promise<boolean> {
    try {
      await this.appointmentsRepository.clearPrice(data.id_court_to);
      const existingPrices =
        await this.appointmentsRepository.findPricesByCourt(data.id_court_from);

      existingPrices.map(async item => {
        await this.appointmentsRepository.createPrice({
          id_sport: item.id_sport,
          id_court: data.id_court_to,
          week_day: item.week_day,
          price: item.price,
          hour: item.hour,
        });
        return null;
      });

      return true;
    } catch {
      return false;
    }
  }
}

export default CopyPriceService;
