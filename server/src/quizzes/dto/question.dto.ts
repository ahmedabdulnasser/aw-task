import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QuestionDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsNumber()
  correctAnswer: number; // Correct answer index
}
