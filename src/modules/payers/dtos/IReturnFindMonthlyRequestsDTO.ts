interface IMonthlyRequestDTO {
  id: string;
  user_name: string;
  teacher_name: string;
  day_of_week: number;
  hour: number;
}

export default interface IReturnFindMonthlyRequestsDTO {
  count: number;
  requests: IMonthlyRequestDTO[];
}
