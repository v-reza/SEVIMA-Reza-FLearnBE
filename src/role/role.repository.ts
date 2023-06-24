import { Injectable } from "@nestjs/common";
import { Role } from "./entities/role.entity";
import { BaseService } from '../common/base.service';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class RoleRepository extends BaseService<Role> {
  constructor(@InjectModel(Role) private readonly roleModel: typeof Role) {
    super(roleModel);
  }
}