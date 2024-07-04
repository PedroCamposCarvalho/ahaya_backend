export default interface IFindHoursDTO {
  id: string;

  id_class: string;

  id_week: string;

  category: string;

  strength: number;

  id_sport: string;

  sport_name: string;

  court_name: string;

  teacher_name: string;

  hour: number;

  photo_url: string;

  price: number;

  limit: number;

  is_user_in_list: boolean;

  is_recurrent: boolean;

  users_in_list: number;

  show_to_user: boolean;
}
