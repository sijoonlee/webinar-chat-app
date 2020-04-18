// {
//   "id": "a657bdca-99a6-48bb-a4b1-0fa92348247b",
//   "content": "First Message",
//   "userId": "96478f69-5471-4193-a8c3-bd3de8242299",
//   "conversationId": "12461a24-f583-4502-bbd7-ea3680a03c2d",
//   "updatedAt": "2020-03-28T21:07:48.249Z",
//   "createdAt": "2020-03-28T21:07:48.249Z"
// }
import { AllowNull, BelongsTo, Column, DataType, Model, Table, ForeignKey } from 'sequelize-typescript';

import { User } from './User';
import { Conversation } from './Conversation';

@Table({ paranoid: true })
export class Message extends Model<Message> {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID
  })
  id: string;

  @AllowNull(false)
  @Column
  content: string;

  // This is the column of the conversation ID itself
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string; // Who sent the message

  // This is just for Sequelize to create a one to one relationship
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Conversation)
  @Column(DataType.UUID)
  conversationId: string;
}