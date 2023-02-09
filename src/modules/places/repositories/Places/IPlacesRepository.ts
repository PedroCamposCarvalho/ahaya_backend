import Place from '../../infra/typeorm/entities/Places/Place';
import ICreatePlaceDTO from '../../dtos/Places/ICreatePlaceDTO';

export default interface IPlacesRepository {
  create(data: ICreatePlaceDTO): Promise<Place>;
  save(place: Place): Promise<Place>;
  getAll(): Promise<Place[]>;
  findById(id: string): Promise<Place>;
}
