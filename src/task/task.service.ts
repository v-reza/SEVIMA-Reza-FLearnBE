import { Classroom } from './../classroom/entities/classroom.entity';
import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
@Injectable()
export class TaskService extends TaskRepository {
  
  rootService() {
    // Run something from super or extends from Repository
    // Please dont override findAll, findOne, create, update, remove from this function
    this.JoinModel([Classroom])
  }
}