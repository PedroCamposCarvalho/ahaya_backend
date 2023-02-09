import { injectable, inject } from 'tsyringe';
import UserTypes from '../infra/typeorm/entities/UserTypes';
import IUserTypesRepository from '../repositories/IUserTypesRepository';

@injectable()
class FindUserTypeService {
  constructor(
    @inject('UserTypesRepository')
    private userTypesRepository: IUserTypesRepository,
  ) {}

  public async execute(id_type: string): Promise<UserTypes> {
    const userType = await this.userTypesRepository.findByTypeId(id_type);

    return userType;
  }
}

export default FindUserTypeService;
