import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './schemas/quiz.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [QuizzesController],
  providers: [QuizzesService],
  exports: [QuizzesService],
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: Quiz.name,
        schema: QuizSchema,
      },
    ]),
  ],
})
export class QuizzesModule {}
