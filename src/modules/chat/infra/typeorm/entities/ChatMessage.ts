import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('chat_messages')
class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  id_user: string;

  @Column()
  id_admin: string;

  @Column()
  sender: string;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default ChatMessage;
