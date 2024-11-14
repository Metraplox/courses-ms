import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({
  timestamps: true,
  _id: true,
})
export class Course {
  @Prop({ type: String, required: true })
  courseName: string;

  @Prop({ type: Types.ObjectId, required: true })
  teacherId: Types.ObjectId;

  @Prop()
  description: string;

  @Prop({ type: Number, required: true })
  price: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
