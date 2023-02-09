import { getRepository, Repository } from 'typeorm';
import IUserTypesRepository from '@modules/users/repositories/IUserTypesRepository';
import AppError from '../../../../../shared/errors/AppError';
import UserTypes from '../entities/UserTypes';

class UserTypesRepository implements IUserTypesRepository {
  private ormRepository: Repository<UserTypes>;

  constructor() {
    this.ormRepository = getRepository(UserTypes);
  }

  public async findByTypeId(id_type: string): Promise<UserTypes> {
    const user_type = await this.ormRepository.findOne({
      where: { id: id_type },
    });

    if (!user_type) {
      throw new AppError('Tipo não encontrado');
    }

    return user_type;
  }
}
export default UserTypesRepository;
