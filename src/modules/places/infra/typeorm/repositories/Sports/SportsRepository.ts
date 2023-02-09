import { getRepository, Repository } from 'typeorm';

import ISportsRepository from '@modules/places/repositories/Sports/ISportsRepository';
import ICreateSportDTO from '@modules/places/dtos/Sports/ICreateSportDTO';
import ICreateCategoryDTO from '@modules/places/dtos/Sports/ICreateCategoryDTO';
import IEditCategoryDTO from '@modules/places/dtos/Sports/IEditCategoryDTO';
import IReturnAllSportsDTO from '@modules/places/dtos/Sports/IReturnAllSportsDTO';

import AppError from '@shared/errors/AppError';
import Sport from '../../entities/Sports/Sport';
import SportPrice from '../../entities/Sports/SportPrice';
import SportCategory from '../../entities/Sports/SportCategory';
import Court from '../../entities/Courts/Court';

class SportsRepository implements ISportsRepository {
  private ormRepository: Repository<Sport>;

  private courtRepository: Repository<Court>;

  private priceRepository: Repository<SportPrice>;

  private categoryRepository: Repository<SportCategory>;

  constructor() {
    this.ormRepository = getRepository(Sport);
    this.courtRepository = getRepository(Court);
    this.priceRepository = getRepository(SportPrice);
    this.categoryRepository = getRepository(SportCategory);
  }

  public async create(sportData: ICreateSportDTO): Promise<Sport> {
    const existingSport = await this.ormRepository.findOne({
      where: {
        name: sportData.name,
      },
    });

    if (existingSport) {
      throw new AppError('Nome existente!');
    }

    const sport = this.ormRepository.create(sportData);
    await this.ormRepository.save(sport);
    return sport;
  }

  public async findAll(): Promise<IReturnAllSportsDTO[]> {
    const sports = await this.ormRepository.query(
      'select spo.id, spo.name, ty.name as type_name, spo.id_type, spo.photo,spo.created_at, spo.updated_at from sports spo inner join court_types ty on spo.id_type = ty.id',
    );
    return sports;
  }

  public async findById(id: string): Promise<Sport> {
    const sport = await this.ormRepository.findOne({
      where: { id },
    });
    if (!sport) {
      throw new AppError('Esporte não encontrado');
    }
    return sport;
  }

  public async findByCourtId(id_court: string): Promise<Sport[]> {
    const court = await this.courtRepository.findOne({
      where: {
        id: id_court,
      },
    });

    if (!court) {
      throw new AppError('Quadra não encontrada');
    }

    const sports = await this.ormRepository.query(
      `select spo.id, spo.name, spo.photo, pri.regular from sports spo inner join sport_price pri on spo.id = pri.sport_id

      where spo.id_type='${court.id_type}'`,
    );
    return sports;
  }

  public async save(sport: Sport): Promise<Sport> {
    return this.ormRepository.save(sport);
  }

  public async findPriceBySportId(id_sport: string): Promise<Sport> {
    const sport = await this.ormRepository.query(
      `select spo.id, spo.name, spo.photo, pri.regular, pri.weekend_regular from sports spo inner join sport_price pri on spo.id = pri.sport_id

      where spo.id='${id_sport}'`,
    );
    return sport[0];
  }

  public async findSportsForPricesPage(): Promise<Sport[]> {
    const sports = await this.ormRepository.query(
      'select spo.id, spo.name, pri.regular from sports spo inner join sport_price pri on spo.id = pri.sport_id',
    );
    return sports;
  }

  public async findPriceBySport(id_sport: string): Promise<SportPrice> {
    const sport = await this.priceRepository.findOne({
      where: {
        sport_id: id_sport,
      },
    });
    if (!sport) {
      throw new AppError('Sport not found');
    }
    return sport;
  }

  public async findCategoriesBySport(
    id_sport: string,
  ): Promise<SportCategory[]> {
    const categories = await this.categoryRepository.find({
      where: { id_sport },
    });
    return categories;
  }

  public async createCategory(
    data: ICreateCategoryDTO,
  ): Promise<SportCategory> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { strength: data.strength },
    });

    if (existingCategory) {
      throw new AppError('Escolha outra força para esta categoria');
    }

    const category = await this.categoryRepository.create(data);
    await this.categoryRepository.save(category);
    return category;
  }

  public async editCategory(data: IEditCategoryDTO): Promise<SportCategory> {
    const { id, identifier, description, strength } = data;
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new AppError('Category not found');
    }
    if (category.strength !== strength) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { strength },
      });

      if (existingCategory) {
        throw new AppError('Escolha outra força para esta categoria');
      }
    }

    category.identifier = identifier;
    category.description = description;
    category.strength = strength;

    await this.categoryRepository.save(category);
    return category;
  }

  public async deleteSport(id: string): Promise<Sport> {
    const sport = await this.ormRepository.findOne({ where: { id } });
    if (!sport) {
      throw new AppError('Sport not found');
    }
    await this.ormRepository.remove(sport);
    return sport;
  }
}
export default SportsRepository;
