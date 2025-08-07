import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument } from './schemas';
import { CreateQuizDto, UpdateQuizDto } from './dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectModel(Quiz.name)
    private quizModel: Model<QuizDocument>,
  ) {}

  async create(dto: CreateQuizDto): Promise<Quiz> {
    return await this.quizModel.create(dto);
  }

  async findAll(): Promise<Quiz[]> {
    return this.quizModel.find().sort({ postedAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Quiz> {
    const found = await this.quizModel.findById(id);
    if (!found) {
      throw new NotFoundException('Quiz not found.');
    }
    return found;
  }

  async update(id: string, dto: UpdateQuizDto): Promise<Quiz> {
    const updated = await this.quizModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      throw new NotFoundException(`Quiz with ID ${id} not found.`);
    }
    return updated;
  }

  async remove(id: string): Promise<Quiz> {
    const deleted = await this.quizModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Quiz with ID ${id} not found.`);
    }

    return deleted;
  }
}
