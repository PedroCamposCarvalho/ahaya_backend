import { getRepository, Repository, Like } from 'typeorm';

import ICourtsRepository from '@modules/places/repositories/Courts/ICourtsRepository';
import ICreateCourtDTO from '@modules/places/dtos/Courts/ICreateCourtDTO';
import IGetCourtsDTO from '@modules/places/dtos/Courts/IGetCourtsDTO';
import IUpdateCourtDTO from '@modules/places/dtos/Courts/IUpdateCourtDTO';

import AppError from '@shared/errors/AppError';
import Court from '../../entities/Courts/Court';
import CourtSport from '../../entities/Courts/CourtSport';
import CourtType from '../../entities/Courts/CourtType';

class CourtsRepository implements ICourtsRepository {
  private ormRepository: Repository<Court>;

  private courtSportRepository: Repository<CourtSport>;

  private courtTypeRepository: Repository<CourtType>;

  constructor() {
    this.ormRepository = getRepository(Court);
    this.courtSportRepository = getRepository(CourtSport);
    this.courtTypeRepository = getRepository(CourtType);
  }

  public async create(data: ICreateCourtDTO): Promise<Court> {
    const { name, id_place, id_type, covered, sports } = data;

    const court = this.ormRepository.create({
      id_place,
      id_type,
      covered,
      name,
    });
    await this.ormRepository.save(court);

    sports.map(async sport => {
      const courtSport = await this.courtSportRepository.create({
        court_id: court.id,
        sport_id: sport.id,
      });
      await this.courtSportRepository.save(courtSport);
      return null;
    });

    return court;
  }

  public async save(court: Court): Promise<Court> {
    return this.ormRepository.save(court);
  }

  public async getAll(id_place: string): Promise<IGetCourtsDTO[]> {
    const courts = await this.ormRepository.query(
      `select CO.id, CO.name as courtname, CO.covered ,CO.photo from courts CO where CO.id_place = '${id_place}'`,
    );

    return courts;
  }

  public async findLikeName(id_place: string, name: string): Promise<Court[]> {
    const courts = await this.ormRepository.find({
      where: {
        id_place,
        name: Like(`%${name}%`),
      },
    });
    return courts;
  }

  public async findById(id: string): Promise<Court> {
    const court = await this.ormRepository.findOne(id);
    if (!court) {
      throw new AppError('Quadra não encontrada');
    }
    return court;
  }

  public async updateCourtName(id: string, name: string): Promise<Court> {
    const existingCourt = await this.ormRepository.findOne({
      where: { name },
    });
    if (existingCourt) {
      throw new AppError('Nome existente!');
    }
    const court = await this.ormRepository.findOne(id);
    if (!court) {
      throw new AppError('Quadra não encontrada');
    }
    court.name = name;
    await this.ormRepository.save(court);
    return court;
  }

  public async findCourtsBySportId(id_sport: string): Promise<Court[]> {
    const sports = await this.ormRepository.query(
      `select cou.id, cou.id_place, cou.name from courts cou inner join court_sport cosp on cou.id = cosp.court_id where cosp.sport_id = '${id_sport}'`,
    );
    return sports;
  }

  public async findCourtSport(): Promise<CourtSport[]> {
    const courtSport = await this.courtSportRepository.find();
    return courtSport;
  }

  public async update(data: IUpdateCourtDTO): Promise<Court> {
    const court = await this.ormRepository.findOne({
      where: { id: data.id },
    });
    if (!court) {
      throw new AppError('Court not found');
    }
    court.name = data.name;
    court.covered = data.covered;
    await this.ormRepository.save(court);
    await this.courtSportRepository.query(
      `delete from court_sport where court_id = '${data.id}'`,
    );
    data.sports.map(async item => {
      const courtSport = await this.courtSportRepository.create({
        court_id: data.id,
        sport_id: item,
      });
      await this.courtSportRepository.save(courtSport);
      return null;
    });

    return court;
  }

  public async findAllCourtTypes(): Promise<CourtType[]> {
    const courtTypes = await this.courtTypeRepository.find();
    return courtTypes;
  }

  public async deleteCourt(id: string): Promise<Court> {
    const court = await this.ormRepository.findOne({ where: { id } });
    if (!court) {
      throw new AppError('Court not found');
    }
    await this.ormRepository.remove(court);

    return court;
  }
}
export default CourtsRepository;
