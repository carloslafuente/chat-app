import { Chat } from './chat.model';
import { User } from './user.model';

export class Message {
  chat: Chat;
  user: User;
  message: string;
  date: Date;
  file: string;
}
