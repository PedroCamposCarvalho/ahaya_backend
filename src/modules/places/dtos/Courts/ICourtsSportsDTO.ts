export interface ISportsDTO {
  id: string;
  name: string;
}

export default interface ICourtsSportsDTO {
  id: string;
  name: string;
  sports: ISportsDTO[];
}
