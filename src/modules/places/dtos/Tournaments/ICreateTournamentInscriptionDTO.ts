export default interface ICreateTournamentInscriptionDTO {
  id_tournament_type: string;

  id_user: string;

  id_transaction: string;

  paid: boolean;

  second_player: string;
}
