// @ts-nocheck
// @ts-ignore
import { ERROR } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async profile(user: UserEntity) {
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
