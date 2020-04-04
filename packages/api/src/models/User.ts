// {
//   "id": "96478f69-5471-4193-a8c3-bd3de8242299",
//   "firstName": "BBB",
//   "lastName": "CCC",
//   "email": "BBBCCC@DDD.com",
//   "password": "testpassword",
//   "updatedAt": "2020-03-28T20:55:20.660Z",
//   "createdAt": "2020-03-28T20:55:20.660Z"
// }


import { AllowNull, BelongsToMany, Column, DataType, Model, Table, Unique } from 'sequelize-typescript';

import { Conversation } from './Conversation';
import { UserConversation } from './UserConversation';

@Table({ paranoid: true })
export class User extends Model<User> {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID
  })
  id: string;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @BelongsToMany(() => Conversation, () => UserConversation)
  conversations: Conversation[];
}
