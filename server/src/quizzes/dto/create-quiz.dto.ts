import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { QuestionDto } from './question.dto';
import { Type } from 'class-transformer';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty({ message: 'The title field is required.' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];

  @IsString()
  @IsOptional()
  createdBy?: string;
}
