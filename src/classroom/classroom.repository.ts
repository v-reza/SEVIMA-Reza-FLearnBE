import { Injectable } from "@nestjs/common";
import { Classroom } from "./entities/classroom.entity";
import { BaseService } from '../common/base.service';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class ClassroomRepository extends BaseService<Classroom> {
  constructor(@InjectModel(Classroom) private readonly classroomModel: typeof Classroom) {
    super(classroomModel);
  }
}