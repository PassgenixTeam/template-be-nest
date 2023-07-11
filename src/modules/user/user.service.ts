import { customPlaintToInstance } from '@app/common';
import { CustomBadRequestException } from '@app/common/exception/custom-bad-request.exception';
import { Injectable } from '@nestjs/common';
import { ProfileResponseDto } from 'src/modules/user/dto/get-user.dto';
import { ERROR_MESSAGES } from 'src/shared/constants/errors';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  profile(user: UserEntity): ProfileResponseDto {
    return customPlaintToInstance(ProfileResponseDto, user);
  }

  findAll() {
    // return `This action returns all user`;
    throw new CustomBadRequestException(ERROR_MESSAGES.UserNotFound);
  }

  update(id: number, _updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
