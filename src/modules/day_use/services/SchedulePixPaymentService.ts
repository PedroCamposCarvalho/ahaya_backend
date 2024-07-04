import { injectable, inject } from 'tsyringe';
import axios from 'axios';
import { differenceInMinutes, addHours } from 'date-fns';
import keys from '@modules/payments/keys';
import IDayUseRepository from '../repositories/IDayUseRepository';

@injectable()
class SchedulePixPaymentService {
  constructor(
    @inject('DayUseRepository')
    private dayUseRepository: IDayUseRepository,
  ) {}

  public async execute(): Promise<void> {
    const dayUseUsers = await this.dayUseRepository.findAllUnpaidUsers();
    const hoursToAdd = String(process.env.ENV === 'dev') ? -3 : -1;
    dayUseUsers.map(async item => {
      if (
        differenceInMinutes(new Date(), addHours(item.created_at, hoursToAdd)) >
        30
      ) {
        await this.dayUseRepository.deleteUser(item.id_user, item.id_dayuse);
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
              this.dayUseRepository.updatePaidUser(item.id);
            }
          })
          .catch();
      }
    });
  }
}

export default SchedulePixPaymentService;
