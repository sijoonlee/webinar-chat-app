// {
//   "id": "12461a24-f583-4502-bbd7-ea3680a03c2d",
//   "name": "First Conversation",
//   "updatedAt": "2020-03-28T21:04:27.426Z",
//   "createdAt": "2020-03-28T21:04:27.426Z"
// }
import { Column, DataType, HasMany, Model, Table, BelongsToMany, AllowNull } from 'sequelize-typescript';

import { Message } from './Message';
import { User } from './User';
import { UserConversation } from './UserConversation';

@Table({ paranoid: true })
export class Conversation extends Model<Conversation> {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID
  })
  id: string;

  @AllowNull(false)
  @Column
  name: string;

  // Setup relationship to messages
  @HasMany(() => Message)
  messages: Message[];

  // Setup relationship to messages
  @BelongsToMany(() => User, () => UserConversation)
  users: User[];
}
