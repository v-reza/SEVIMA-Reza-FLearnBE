import { Classroom } from './../../classroom/entities/classroom.entity';
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
  
@Table({ tableName: 'sevima_task', timestamps: false })
export class Task extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  _id: number;

  @Column
  task_name: string

  @Column
  task_description: string

  @Column({
    type: DataType.DATE
  })
  task_start_date: Date

  @Column({
    type: DataType.DATE
  })
  task_end_date: Date

  @Column({
    type: DataType.TEXT
  })
  user_answer_task: string


  @ForeignKey(() => Classroom)
  @Column
  target_classroom_code: string

  @BelongsTo(() => Classroom)
  target_classroom: Classroom

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
