export default interface IFindMothlyRequestsFilterDTO {
  limit: number;
  offset: number;
  orderNameBy?: 'ASC' | 'DESC';
}
