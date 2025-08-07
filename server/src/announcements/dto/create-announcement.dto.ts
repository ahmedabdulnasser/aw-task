import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAnnouncementDto {
  @IsString()
  @IsNotEmpty({ message: 'The title field is required.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'The content field is required.' })
  content: string;

  @IsString()
  @IsOptional()
  createdBy?: string;
}
