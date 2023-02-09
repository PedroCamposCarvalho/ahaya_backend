import PrivacyPolicy from '../infra/typeorm/entities/PrivacyPolicy';
import ICreatePrivacyPolicyDTO from '../dtos/ICreatePrivacyPolicyDTO';

export default interface IPrivacyPolicyRepository {
  find(id_place: string): Promise<PrivacyPolicy | undefined>;
  create(data: ICreatePrivacyPolicyDTO): Promise<PrivacyPolicy>;
}
