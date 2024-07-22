export interface ICourts {
  id: string;
  court_name: string;
  available: boolean;
  price: number;
  court_photo: string;
}

export default interface IReturnAvailableHoursDTO {
  hour: number;
  props: ICourts[];
}
