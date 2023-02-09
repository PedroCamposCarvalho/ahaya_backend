import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tournament_categories_types')
class TournamentCategoryTypes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_tournament_category: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TournamentCategoryTypes;
