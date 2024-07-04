import UserTypes from '../infra/typeorm/entities/UserTypes';

export default interface IUserTypesRepository {
  findByTypeId(id_type: string): Promise<UserTypes>;
}
