import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Classroom } from './entities/classroom.entity';

import { ClassroomController } from './classroom.controller';

@Module({
  imports: [SequelizeModule.forFeature([Classroom])],
  controllers: [ClassroomController],
  providers: [ClassroomService]
})
export class ClassroomModule {}
