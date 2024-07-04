import { getRepository, Repository } from 'typeorm';

import IPaymentDataRepository from '@modules/places/repositories/PaymentData/IPaymentDataRepository';

import PaymentData from '../../entities/PaymentData/PaymentData';

class PaymentDataRepository implements IPaymentDataRepository {
  private ormRepository: Repository<PaymentData>;

  constructor() {
    this.ormRepository = getRepository(PaymentData);
  }

  public async find(): Promise<PaymentData> {
    const paymentData = await this.ormRepository.find();

    return paymentData[0];
  }
}
export default PaymentDataRepository;
