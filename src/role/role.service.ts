import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
@Injectable()
export class RoleService extends RoleRepository {
  
  rootService() {
    // Run something from super or extends from Repository
    // Please dont override findAll, findOne, create, update, remove from this function
    this.JoinModel([])
  }
}