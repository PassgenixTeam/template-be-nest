import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IProfileResponseDto } from 'src/shared/dto/user/profile.dto';

export class ProfileResponseDto implements IProfileResponseDto {
  @ApiResponseProperty({
    type: String,
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id!: string;

  @ApiResponseProperty({ type: String, example: 'email@gmail.com' })
  @Expose()
  email!: string;

  @ApiResponseProperty({ type: String, example: 'John' })
  @Expose()
  firstName!: string;

  @ApiResponseProperty({ type: String, example: 'Doe' })
  @Expose()
  lastName!: string;

  @ApiResponseProperty({
    type: String,
    example:
      // eslint-disable-next-line max-len
      'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA=',
  })
  @Expose()
  avatarUrl!: string;

  @ApiResponseProperty({ type: Date, example: '2021-01-01T00:00:00.000Z' })
  @Expose()
  createdAt!: Date;

  @ApiResponseProperty({ type: Date, example: '2021-01-01T00:00:00.000Z' })
  @Expose()
  updatedAt!: Date;
}
