import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type CourseDocument = HydratedDocument<Course>;

@Schema({
  timestamps: true,
})
export class Course {
  @Prop({ type: uuid, required: true })
  _id: string;

  @Prop({ type: String, required: true })
  courseName: string;

  @Prop({ type: uuid, required: true })
  teacherId: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({ type: String, required: true })
  imageUrl: string;

  @Prop({ type: String, required: true })
  classes: string[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
