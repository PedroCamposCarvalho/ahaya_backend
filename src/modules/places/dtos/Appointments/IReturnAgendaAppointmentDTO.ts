export interface IMaterialsProps {
  material_name: string;
  amount: number;
}

export default interface IReturnAgendaAppointmentDTO {
  id: string;
  price: string;
  observation: string;
  start_date: Date;
  cellphone: string;
  court_name: string;
  created_at: string;
  sport_name: string;
  materials: IMaterialsProps[];
}
