import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { QuizzesModule } from '../quizzes/quizzes.module';
import { AnnouncementsModule } from '../announcements/announcements.module';

@Module({
  imports: [QuizzesModule, AnnouncementsModule],
  controllers: [SeedController],
})
export class SeedModule {}
