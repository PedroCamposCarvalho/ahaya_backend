import { injectable, inject } from 'tsyringe';

import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class DeleteClassService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(id_class: string): Promise<void> {
    await this.experimentalClassRepository.deleteClass(id_class);
  }
}

export default DeleteClassService;
