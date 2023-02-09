import { injectable, inject } from 'tsyringe';
import axios from 'axios';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import getCardFlag from '@modules/payments/utils/get_card_flag';
import MonthlyCreditCards from '../infra/typeorm/entities/MonthlyCreditCards';
import { ICreateMonthlyCreditCardRequestDTO } from '../dtos/ICreateMonthlyCreditCardDTO';
import IPayersRepository from '../repositories/IPayersRepository';

@injectable()
class CreateMonthlyCreditCardService {
  constructor(
    @inject('PayersRepository')
    private payersRepository: IPayersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(
    data: ICreateMonthlyCreditCardRequestDTO,
  ): Promise<MonthlyCreditCards> {
    const flag = getCardFlag(data.number);

    const paymentData = {
      holder_name: data.holder,
      registry_code: data.ssn
        .replace('.', '')
        .replace('.', '')
        .replace('-', ''),
      card_expiration: data.expiry,
      allow_as_fallback: true,
      card_number: data.number,
      card_cvv: data.cvc,
      payment_method_code: 'credit_card',
      payment_company_code: flag,
    };

    try {
      const response = await axios.post(
        'http://localhost:8888/payments/createPaymentProfile',
        paymentData,
      );

      const gateway_token = String(response.data.gateway_token);

      const monthlyCreditCard = await this.payersRepository.createMonthlyCreditCard(
        {
          id_user: data.id_user,
          flag,
          last4digits: data.holder.substring(data.holder.length - 4),
          payment_profile: gateway_token,
        },
      );

      return monthlyCreditCard;
    } catch (error) {
      throw new Error();
    }
  }
}

export default CreateMonthlyCreditCardService;
