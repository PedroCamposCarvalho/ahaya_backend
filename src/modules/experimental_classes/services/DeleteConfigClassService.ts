import { injectable, inject } from 'tsyringe';

import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class DeleteConfigClassService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(id_class: string): Promise<void> {
    await this.experimentalClassRepository.deleteConfigClass(id_class);
  }
}

export default DeleteConfigClassService;
