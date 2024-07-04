interface ISportDTO {
  id: string;
  name: string;
}

export default interface ICreateCourtDTO {
  name: string;

  id_place: string;

  id_type: string;

  covered: boolean;

  sports: ISportDTO[];
}
