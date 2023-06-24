import { Classroom } from './../classroom/entities/classroom.entity';
import { Role } from './../role/entities/role.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService extends UserRepository {
  
  rootService() {
    // Run something from super or extends from Repository
    // Please dont override findAll, findOne, create, update, remove from this function
    this.JoinModel([Role, Classroom])
  }

  async login(requestBody: any) {
    const { username, password } = requestBody
    const user = await this.repository.findOne({
      where: {
        username,
        password
      }
    })

    if (!user) throw new NotFoundException('Record ID not found')

    return await super.findOne(user.dataValues._id)
  }
}