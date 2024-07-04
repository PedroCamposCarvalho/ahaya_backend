export interface ICategoriesTypesDTO {
  id: string;
  name: string;
  price: number;
}

export default interface IReturnCategoriesDTO {
  id_category: string;

  name: string;

  image: string;

  can_be_both: boolean;

  categories: ICategoriesTypesDTO[];
}
