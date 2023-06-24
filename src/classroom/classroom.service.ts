import { Injectable } from '@nestjs/common';
import { ClassroomRepository } from './classroom.repository';
@Injectable()
export class ClassroomService extends ClassroomRepository {
  
  rootService() {
    // Run something from super or extends from Repository
    // Please dont override findAll, findOne, create, update, remove from this function
    this.JoinModel([])
  }
}