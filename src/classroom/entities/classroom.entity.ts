import { Task } from './../../task/entities/task.entity';
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
  
@Table({ tableName: 'sevima_classroom', timestamps: false })
export class Classroom extends Model {
  @Column({
    primaryKey: true,
  })
  code: string;

  @Column
  name: string

  @HasMany(() => User)
  users: User[]

  @HasMany(() => Task)
  tasks: Task[]

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
