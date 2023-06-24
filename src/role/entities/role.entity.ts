import { User } from './../../user/entities/user.entity';
import {
  Table,
  Model,
  Column,
  DataType,
  Sequelize,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
  
@Table({ tableName: 'sevima_role', timestamps: false })
export class Role extends Model {
  @Column({
    primaryKey: true,
  })
  code: string;

  @Column
  name: string

  @HasMany(() => User)
  users: User[]

  @Column({
    field: 'created_at',
    type: DataType.DATE,
    defaultValue: new Date()
  })
  created_at: Date;

  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    defaultValue: new Date()
  })
  updated_at: Date;

  @Column({ defaultValue: 'system' })
  created_by: string;

  @Column({ defaultValue: 'system' })
  updated_by: string;
}
