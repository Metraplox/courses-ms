import { Body, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CoursesMSG } from 'src/common/constants';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @MessagePattern(CoursesMSG.CREATE)
  create(@Payload() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @MessagePattern(CoursesMSG.FIND_ALL)
  findAll() {
    return this.courseService.findAll();
  }

  @MessagePattern(CoursesMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.courseService.findOne(id);
  }

  @MessagePattern(CoursesMSG.UPDATE)
  update(@Payload() id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @MessagePattern(CoursesMSG.DELETE)
  remove(@Payload() id: string) {
    return this.courseService.remove(+id);
  }
}
