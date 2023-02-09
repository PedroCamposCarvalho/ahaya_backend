import Court from '../../infra/typeorm/entities/Courts/Court';
import CourtSport from '../../infra/typeorm/entities/Courts/CourtSport';
import CourtType from '../../infra/typeorm/entities/Courts/CourtType';
import ICreateCourtDTO from '../../dtos/Courts/ICreateCourtDTO';
import IGetCourtsDTO from '../../dtos/Courts/IGetCourtsDTO';
import IUpdateCourtDTO from '../../dtos/Courts/IUpdateCourtDTO';

export default interface ICourtsRepository {
  create(data: ICreateCourtDTO): Promise<Court>;
  save(court: Court): Promise<Court>;
  getAll(id_place: string): Promise<IGetCourtsDTO[]>;
  findLikeName(id_place: string, name: string): Promise<Court[]>;
  findById(id: string): Promise<Court>;
  updateCourtName(id: string, name: string): Promise<Court>;
  findCourtsBySportId(id_court: string): Promise<Court[]>;
  findCourtSport(): Promise<CourtSport[]>;
  update(data: IUpdateCourtDTO): Promise<Court>;
  findAllCourtTypes(): Promise<CourtType[]>;
  deleteCourt(id: string): Promise<Court>;
}
