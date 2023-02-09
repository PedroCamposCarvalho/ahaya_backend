import { injectable, inject } from 'tsyringe';
import axios from 'axios';
import { differenceInMinutes, addHours } from 'date-fns';
import keys from '@modules/payments/keys';
import ITournamentsRepository from '../../repositories/Tournaments/ITournamentsRepository';

@injectable()
class SchedulePixPaymentService {
  constructor(
    @inject('TournamentsRepository')
    private tournamentsRepository: ITournamentsRepository,
  ) {}

  public async execute(): Promise<void> {
    const incriptions = await this.tournamentsRepository.findAllUnpaidUsers();
    const hoursToAdd = String(process.env.ENV === 'dev') ? -3 : -1;
    incriptions.map(async item => {
      if (
        differenceInMinutes(new Date(), addHours(item.created_at, hoursToAdd)) >
        30
      ) {
        await this.tournamentsRepository.deleteInscription(item.id);
      } else {
        axios
          .get(
            `https://app.vindi.com.br/api/v1/charges/${item.id_transaction}`,
            {
              auth: {
                username: keys().production_private_key,
                password: '',
              },
            },
          )
          .then(response => {
            if (String(response.data.charge.status) === 'paid') {
              this.tournamentsRepository.updatePaidInscription(item.id);
            }
          })
          .catch();
      }
    });
  }
}

export default SchedulePixPaymentService;
