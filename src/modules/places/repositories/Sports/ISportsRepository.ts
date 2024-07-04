import Sport from '../../infra/typeorm/entities/Sports/Sport';
import SportPrice from '../../infra/typeorm/entities/Sports/SportPrice';
import SportCategory from '../../infra/typeorm/entities/Sports/SportCategory';
import ICreateSportDTO from '../../dtos/Sports/ICreateSportDTO';
import ICreateCategoryDTO from '../../dtos/Sports/ICreateCategoryDTO';
import IEditCategoryDTO from '../../dtos/Sports/IEditCategoryDTO';
import IReturnAllSportsDTO from '../../dtos/Sports/IReturnAllSportsDTO';

export default interface ICourtsRepository {
  create(data: ICreateSportDTO): Promise<Sport>;
  save(sport: Sport): Promise<Sport>;
  findAll(): Promise<IReturnAllSportsDTO[]>;
  findById(id: string): Promise<Sport>;
  findByCourtId(id_court: string): Promise<Sport[]>;
  findPriceBySportId(id_sport: string): Promise<Sport>;
  findSportsForPricesPage(): Promise<Sport[]>;
  findPriceBySport(id_sport: string): Promise<SportPrice>;
  findCategoriesBySport(id_sport: string): Promise<SportCategory[]>;
  createCategory(data: ICreateCategoryDTO): Promise<SportCategory>;
  editCategory(data: IEditCategoryDTO): Promise<SportCategory>;
  deleteSport(id: string): Promise<Sport>;
}
