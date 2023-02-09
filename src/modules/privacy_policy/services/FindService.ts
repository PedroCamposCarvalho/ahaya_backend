import { injectable, inject } from 'tsyringe';
import PrivacyPolicy from '../infra/typeorm/entities/PrivacyPolicy';
import IPrivacyPolicyRepository from '../repositories/IPrivacyPolicyRepository';

@injectable()
class FindService {
  constructor(
    @inject('PrivacyPolicyRepository')
    private privacyPolicyRepository: IPrivacyPolicyRepository,
  ) {}

  public async execute(id_place: string): Promise<PrivacyPolicy | undefined> {
    const privacyPolicy = await this.privacyPolicyRepository.find(id_place);

    return privacyPolicy;
  }
}

export default FindService;
