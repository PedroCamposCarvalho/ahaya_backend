import { injectable, inject } from 'tsyringe';
import ICreatePrivacyPolicyDTO from '../dtos/ICreatePrivacyPolicyDTO';
import PrivacyPolicy from '../infra/typeorm/entities/PrivacyPolicy';
import IPrivacyPolicyRepository from '../repositories/IPrivacyPolicyRepository';

@injectable()
class CreateService {
  constructor(
    @inject('PrivacyPolicyRepository')
    private privacyPolicyRepository: IPrivacyPolicyRepository,
  ) {}

  public async execute(data: ICreatePrivacyPolicyDTO): Promise<PrivacyPolicy> {
    const privacyPolicy = await this.privacyPolicyRepository.create(data);

    return privacyPolicy;
  }
}

export default CreateService;
