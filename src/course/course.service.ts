import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './entities/course.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async create({ courseName, description, price, teacherId }: CreateCourseDto) {
    try {
      const course = new this.courseModel({
        courseName,
        description,
        price,
        teacherId,
      });
      return await course.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Course already exists');
      }
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error.message,
      };
    }
  }

  async findAll() {
    try {
      return await this.courseModel.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      return {
        status: HttpStatus.BAD_REQUEST,
        msg: 'Invalid ID',
      };
    }
    try {
      const course = await this.courseModel.findById(id);
      if (!course) {
        throw new NotFoundException(`Course #${id} not found`);
      }
      return course;
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error.message,
      };
    }
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
