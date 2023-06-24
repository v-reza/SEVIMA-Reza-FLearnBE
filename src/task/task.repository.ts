import { Injectable } from "@nestjs/common";
import { Task } from "./entities/task.entity";
import { BaseService } from '../common/base.service';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class TaskRepository extends BaseService<Task> {
  constructor(@InjectModel(Task) private readonly taskModel: typeof Task) {
    super(taskModel);
  }
}