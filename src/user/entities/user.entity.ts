import { Classroom } from './../../classroom/entities/classroom.entity';
import { Role } from './../../role/entities/role.entity';
import {
  Table,
  Model,
  Column,
  DataType,
  Sequelize,
  HasOne,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
  
@Table({ tableName: 'sevima_user', timestamps: false })
export class User extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  _id: number;

  @Column
  username: string
  
  @Column
  password: string

  @ForeignKey(() => Role)
  @Column
  role_code: string

  @BelongsTo(() => Role)
  role: Role

  @ForeignKey(() => Classroom)
  @Column
  classroom_code: string

  @BelongsTo(() => Classroom)
  classroom: Classroom

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
