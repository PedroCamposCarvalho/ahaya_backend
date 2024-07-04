import User from '../infra/typeorm/entities/User';

export default interface IFindAllUsersFiltersResponseDTO {
  count: number;
  users: User[];
}
