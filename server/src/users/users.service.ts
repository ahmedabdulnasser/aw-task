import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserResponse } from './schemas';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const { password, ...result } = user.toObject();
    return result;
  }

  async findByEmail(email: string): Promise<UserResponse> {
    const user = await this.userModel.findOne({ email }).select('-password');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async findByEmailWithPassword(
    email: string,
  ): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findById(id: string): Promise<UserResponse> {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponse | null> {
    const user = await this.findByEmailWithPassword(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await this.userModel.find().select('-password');
    return users.map((user) => user.toObject());
  }

  async getOrCreateDefaultUser(): Promise<UserResponse> {
    let user = await this.userModel.findOne({ email: 'default@school.com' });

    if (!user) {
      const hashedPassword = await bcrypt.hash('default123', 10);
      user = await this.userModel.create({
        email: 'default@school.com',
        password: hashedPassword,
        firstName: 'Default',
        lastName: 'Student',
        role: 'student',
      });
    }

    return this.excludePassword(user);
  }

  private excludePassword(user: UserDocument): UserResponse {
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
  }
}
