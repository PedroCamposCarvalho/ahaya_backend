import { injectable, inject } from 'tsyringe';

import { differenceInMinutes } from 'date-fns';
import IReturnWebReportDTO from '@modules/places/dtos/Appointments/IReturnWebReportDTO';
import IDayUseRepository from '@modules/day_use/repositories/IDayUseRepository';
import IAppointmentsRepository from '../../../repositories/Appointments/IAppointmentsRepository';

interface IRequest {
  type: string;
  year: number;
  month: number;
  id_place: string;
}

@injectable()
class FindUserHistoryService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('DayUseRepository')
    private dayUseRepository: IDayUseRepository,
  ) {}

  public async execute(data: IRequest): Promise<IReturnWebReportDTO[]> {
    const returnData: IReturnWebReportDTO[] = [];

    const numericType = Number(data.type);

    const appointments = await this.appointmentsRepository.findByMonthYearPlace(
      data.month,
      data.year,
      data.id_place,
    );

    const dayUse = await this.dayUseRepository.findAllUsersInMonth(
      data.month,
      data.year,
      data.id_place,
    );

    appointments.map((item, index) => {
      if (index > 0) {
        if (
          differenceInMinutes(
            appointments[index - 1].created_at,
            item.created_at,
          ) !== 0
        ) {
          const newData: IReturnWebReportDTO = {
            id: item.id,
            name: item.observation.replace(' - App', ''),
            date: item.start_date,
            grossValue: Number(item.price),
            netValue: Number(item.price) - (2.8 * Number(item.price)) / 100,
            type: 1,
          };

          returnData.push(newData);
        }
      } else {
        const newData: IReturnWebReportDTO = {
          id: item.id,
          name: item.observation.replace(' - App', ''),
          date: item.start_date,
          grossValue: Number(item.price),
          netValue: Number(item.price) - (2.8 * Number(item.price)) / 100,
          type: 1,
        };

        returnData.push(newData);
      }
      return null;
    });

    dayUse.map(item => {
      const newData: IReturnWebReportDTO = {
        id: item.id,
        name: item.observation.replace(' - App', ''),
        date: item.start_date,
        grossValue: Number(item.paid_price),
        netValue:
          Number(item.paid_price) - (2.8 * Number(item.paid_price)) / 100,
        type: 2,
      };

      returnData.push(newData);
      return null;
    });

    if (numericType === 0) {
      return returnData;
    }

    return returnData.filter(item => item.type === numericType);
  }
}

export default FindUserHistoryService;
