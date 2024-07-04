import { injectable, inject } from 'tsyringe';
import axios from 'axios';
import { differenceInMinutes, addHours } from 'date-fns';
import keys from '@modules/payments/keys';
import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class SchedulePixPaymentService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(): Promise<void> {
    const dayUseUsers =
      await this.experimentalClassRepository.findAllUnpaidUsers();
    const hoursToAdd = String(process.env.ENV === 'dev') ? -3 : -1;
    dayUseUsers.map(async item => {
      if (
        differenceInMinutes(new Date(), addHours(item.created_at, hoursToAdd)) >
        30
      ) {
        await this.experimentalClassRepository.deleteUser(
          item.id_user,
          item.id_experimental_class,
        );
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
              this.experimentalClassRepository.updatePaidUser(item.id);
            }
          })
          .catch();
      }
    });
  }
}

export default SchedulePixPaymentService;
