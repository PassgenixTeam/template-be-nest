import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { ERROR } from '@app/common';
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
