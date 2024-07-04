export default interface IFindAllUsersFiltersDTO {
  limit: number;
  offset: number;
  name?: string;
  orderNameBy?: 'ASC' | 'DESC';
}
