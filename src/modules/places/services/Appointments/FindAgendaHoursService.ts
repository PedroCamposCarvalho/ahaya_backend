import { injectable, inject } from 'tsyringe';
import IReturnAgendaDTO from '../../dtos/Appointments/IReturnAgendaDTO';
import IAppointmentsRepository from '../../repositories/Appointments/IAppointmentsRepository';
import IMonthlyRepository from '../../../monthly/repositories/IMonthlyRepository';

interface IDataProps {
  id_appointment: string;
  id_court: string;
  observation: string;
}

interface IReturnProps {
  hour: number;
  appointment: IReturnAgendaDTO[];
}

interface IAgendaItemsMap {
  [date: string]: IDataProps[];
}

@injectable()
class FindAgendaHoursService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('MonthlyRepository')
    private monthlyRepository: IMonthlyRepository,
  ) {}

  public async execute(
    day: number,
    month: number,
    year: number,
    id_place?: string,
  ): Promise<IReturnProps[]> {
    try {
      const appointments =
        await this.appointmentsRepository.findAllInDayForAgenda({
          day,
          month,
          year,
          id_place: 'f13f0061-01f0-476f-9d6c-fe4a1a1f64ca',
        });

      const monthlys = await this.monthlyRepository.findMonthlysForAppAgenda({
        day,
        month,
        year,
      });

      const hours: number[] = [
        7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
      ];

      const mixedData: IReturnAgendaDTO[] = [];

      // appointments.map(item => {
      //   mixedData.push(item);
      //   return null;
      // });

      appointments.map(item => {
        for (let i = item.hour; i < item.finish_hour; i++) {
          mixedData.push({
            court_name: item.court_name,
            hour: i,
            finish_hour: item.finish_hour,
            id: item.id,
            observation: item.observation,
          });
        }
        return null;
      });

      monthlys.map(item => {
        mixedData.push({
          id: item.id,
          court_name: item.court_name,
          hour: item.hour,
          finish_hour: 0,
          observation: `${item.observation} - Mensal`,
        });
        return null;
      });

      const separatedHours: IReturnProps[] = [];

      hours.map(hour => {
        const newItem = {
          hour,
          appointment: mixedData.filter(item => item.hour === hour),
        };

        separatedHours.push(newItem);
        return null;
      });

      return separatedHours;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}

export default FindAgendaHoursService;
