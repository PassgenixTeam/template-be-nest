// @ts-nocheck
// @ts-ignore
import { ERROR } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from 'src/modules/user/user.repository';
import { User } from 'src/modules/user/schema/user.schema';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async profile(user: User) {
    delete user.loginSession;
    delete user.cacheId;
    return user;
  }

  findAll() {
    // return `This action returns all user`;
    throw new Error(ERROR.CanNotCreateUser.toString());
  }

  update(id: number, _updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
