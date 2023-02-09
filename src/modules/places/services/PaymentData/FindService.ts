import { injectable, inject } from 'tsyringe';
import PaymentData from '../../infra/typeorm/entities/PaymentData/PaymentData';
import IPaymentDataRepository from '../../repositories/PaymentData/IPaymentDataRepository';

@injectable()
class FindService {
  constructor(
    @inject('PaymentDataRepository')
    private aymentDataRepository: IPaymentDataRepository,
  ) {}

  public async execute(): Promise<PaymentData> {
    const paymentdata = await this.aymentDataRepository.find();
    return paymentdata;
  }
}

export default FindService;
