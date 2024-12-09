import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async create({
    courseName,
    description,
    price,
    teacherId,
    imageUrl,
    category,
  }: CreateCourseDto) {
    try {
      const course = new this.courseModel({
        courseName,
        description,
        price,
        teacherId,
        imageUrl,
        category,
      });
      return await course.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Course already exists');
      }
      throw new InternalServerErrorException(error);
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
    try {
      const course = await this.courseModel.findById(id);
      if (!course) {
        throw new NotFoundException(`Course #${id} not found`);
      }
      return course;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateCourseInput: UpdateCourseDto) {
    const { courseName, description, price, category, imageUrl, classes } =
      updateCourseInput;

    try {
      const course = await this.courseModel.findByIdAndUpdate(id, {
        courseName,
        description,
        price,
        category,
        imageUrl,
        classes,
      });
      return course;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.courseModel.findByIdAndDelete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
