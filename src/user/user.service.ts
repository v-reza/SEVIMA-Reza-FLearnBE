import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService extends UserRepository {
  
  rootService() {
    // Run something from super or extends from Repository
    // Please dont override findAll, findOne, create, update, remove from this function
    this.JoinModel([])
  }
}