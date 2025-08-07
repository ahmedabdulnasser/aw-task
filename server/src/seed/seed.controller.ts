import { Controller, Post } from '@nestjs/common';
import { QuizzesService } from '../quizzes/quizzes.service';
import { AnnouncementsService } from '../announcements/announcements.service';
import { Types } from 'mongoose';

@Controller('seed')
export class SeedController {
  constructor(
    private readonly quizzesService: QuizzesService,
    private readonly announcementsService: AnnouncementsService,
  ) {}

  @Post()
  async seedData() {
    const sampleUserId = new Types.ObjectId().toString();

    const announcements = [
      {
        title: 'Welcome to the New Semester!',
        content:
          'We are excited to start this new semester with you. Please check your schedules and assignments.',
        createdBy: sampleUserId,
      },
      {
        title: 'Assignment Deadline Reminder',
        content:
          "Don't forget about the upcoming assignment deadline next week. Submit your work on time.",
        createdBy: sampleUserId,
      },
      {
        title: 'Virtual Office Hours',
        content:
          'Office hours will be held virtually every Tuesday and Thursday from 2-4 PM.',
        createdBy: sampleUserId,
      },
    ];

    const quizzes = [
      {
        title: 'JavaScript Fundamentals',
        description: 'Test your knowledge of JavaScript basics',
        questions: [
          {
            title:
              'What is the correct way to declare a variable in JavaScript?',
            options: [
              'var x = 5;',
              'variable x = 5;',
              'v x = 5;',
              'declare x = 5;',
            ],
            correctAnswer: 0,
          },
          {
            title:
              'Which method is used to add an element to the end of an array?',
            options: ['push()', 'add()', 'append()', 'insert()'],
            correctAnswer: 0,
          },
        ],
        createdBy: sampleUserId,
      },
      {
        title: 'React Components',
        description: 'Understanding React component lifecycle',
        questions: [
          {
            title: 'What is JSX?',
            options: [
              'A JavaScript extension',
              'A CSS framework',
              'A database',
              'A server',
            ],
            correctAnswer: 0,
          },
        ],
        createdBy: sampleUserId,
      },
    ];

    for (const announcement of announcements) {
      await this.announcementsService.create(announcement);
    }

    for (const quiz of quizzes) {
      await this.quizzesService.create(quiz);
    }

    return { message: 'Sample data created successfully!' };
  }
}
