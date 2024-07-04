export default interface IReturnUserEvetnsDTO {
  id: string;
  type: string;
  date: Date;
  court_name: string;
  teacher_name?: string;
  retrieved: boolean;
}
