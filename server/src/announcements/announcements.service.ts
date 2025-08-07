import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Announcement, AnnouncementDocument } from './schemas';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './dto';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectModel(Announcement.name)
    private announcementModel: Model<AnnouncementDocument>,
  ) {}

  async create(dto: CreateAnnouncementDto): Promise<Announcement> {
    return this.announcementModel.create(dto);
  }

  async findAll(): Promise<Announcement[]> {
    return this.announcementModel.find().sort({ postedAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Announcement> {
    const found = await this.announcementModel.findById(id);
    if (!found) {
      throw new NotFoundException('Announcement not found.');
    }
    return found;
  }

  async update(id: string, dto: UpdateAnnouncementDto): Promise<Announcement> {
    const updated = await this.announcementModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      throw new NotFoundException(`Announcement with ID ${id} not found.`);
    }
    return updated;
  }

  async remove(id: string): Promise<Announcement> {
    const deleted = await this.announcementModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Announcement with ID ${id} not found.`);
    }

    return deleted;
  }
}
