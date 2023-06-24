import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { BaseService } from '../common/base.service';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class UserRepository extends BaseService<User> {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {
    super(userModel);
  }
}