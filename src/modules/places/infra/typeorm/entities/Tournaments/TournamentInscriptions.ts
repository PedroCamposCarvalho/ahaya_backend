import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tournament_inscriptions')
class TournamentInscriptions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_tournament_type: string;

  @Column()
  id_user: string;

  @Column()
  id_transaction: string;

  @Column()
  paid: boolean;

  @Column()
  second_player: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TournamentInscriptions;
