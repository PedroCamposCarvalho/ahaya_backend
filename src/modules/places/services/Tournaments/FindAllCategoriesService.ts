import IReturnCategoriesDTO, {
  ICategoriesTypesDTO,
} from '@modules/places/dtos/Tournaments/IReturnCategoriesDTO';
import ITournamentsRepository from '@modules/places/repositories/Tournaments/ITournamentsRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class FindAllCategoriesService {
  constructor(
    @inject('TournamentsRepository')
    private tournamentsRepository: ITournamentsRepository,
  ) {}

  public async execute(): Promise<IReturnCategoriesDTO[]> {
    const categories = await this.tournamentsRepository.findAllCategories();

    const types = await this.tournamentsRepository.findAllCategoriesTypes();

    const allCategories: IReturnCategoriesDTO[] = [];

    categories.map(item => {
      const tempTypes: ICategoriesTypesDTO[] = [];

      types
        .filter(item2 => item2.id_tournament_category === item.id)
        .map(item3 => {
          tempTypes.push({
            id: item3.id,
            name: item3.name,
            price: item3.price,
          });
          return null;
        });

      const newItem: IReturnCategoriesDTO = {
        id_category: item.id,
        name: item.name,
        image: item.image,
        can_be_both: item.can_be_both,
        categories: tempTypes,
      };
      allCategories.push(newItem);
      return null;
    });

    return allCategories;
  }
}

export default FindAllCategoriesService;
