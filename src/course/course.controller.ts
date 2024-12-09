import { Body, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CoursesMSG } from 'src/common/constants';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @MessagePattern(CoursesMSG.CREATE)
  create(@Payload() createCourseInput: CreateCourseDto) {
    console.log(createCourseInput);
    return this.courseService.create(createCourseInput);
  }

  @MessagePattern(CoursesMSG.FIND_ALL)
  findAll() {
    console.log('find all');
    return this.courseService.findAll();
  }

  @MessagePattern(CoursesMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.courseService.findOne(id);
  }

  @MessagePattern(CoursesMSG.UPDATE)
  update(
    @Payload() payload: { id: string; updateCourseInput: UpdateCourseDto },
  ) {
    const { id, updateCourseInput } = payload;
    return this.courseService.update(id, updateCourseInput);
  }

  @MessagePattern(CoursesMSG.DELETE)
  remove(@Payload() id: string) {
    return this.courseService.remove(id);
  }

  @MessagePattern(CoursesMSG.FIND_BY_CATEGORY)
  findCoursesByCategory(@Payload() category: string) {
    return this.courseService.findByCategory(category);
  }
}
