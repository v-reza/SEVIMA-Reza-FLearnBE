import {
  Table,
  Model,
  Column,
  DataType,
  Sequelize,
  HasOne,
} from 'sequelize-typescript';
  
@Table({ tableName: 'sevima_user', timestamps: false })
export class User extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  _id: number;

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
