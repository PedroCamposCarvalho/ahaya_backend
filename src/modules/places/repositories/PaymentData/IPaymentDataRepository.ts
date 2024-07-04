import PaymentData from '../../infra/typeorm/entities/PaymentData/PaymentData';

export default interface IPaymentDataRepository {
  find(): Promise<PaymentData>;
}
