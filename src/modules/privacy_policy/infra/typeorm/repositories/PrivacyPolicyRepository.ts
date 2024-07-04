import { getRepository, Repository } from 'typeorm';

import IPrivacyPolicyRepository from '@modules/privacy_policy/repositories/IPrivacyPolicyRepository';
import ICreatePrivacyPolicyDTO from '@modules/privacy_policy/dtos/ICreatePrivacyPolicyDTO';
// import AppError from '@shared/errors/AppError';

import PrivacyPolicy from '../entities/PrivacyPolicy';

class PrivacyPolicyRepository implements IPrivacyPolicyRepository {
  private ormRepository: Repository<PrivacyPolicy>;

  constructor() {
    this.ormRepository = getRepository(PrivacyPolicy);
  }

  public async find(id_place: string): Promise<PrivacyPolicy | undefined> {
    const privacyPolicy = await this.ormRepository.findOne({
      where: { id_place },
    });
    return privacyPolicy;
  }

  public async create(data: ICreatePrivacyPolicyDTO): Promise<PrivacyPolicy> {
    const privacyPolicy = await this.ormRepository.findOne({
      where: { id_place: data.id_place },
    });

    if (privacyPolicy) {
      privacyPolicy.text = data.text;
      await this.ormRepository.save(privacyPolicy);

      return privacyPolicy;
    }

    const newPrivacyPolicy = await this.ormRepository.create(data);

    await this.ormRepository.save(newPrivacyPolicy);

    return newPrivacyPolicy;
  }
}
export default PrivacyPolicyRepository;
