import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String, example: 'ma@123' })
  email: string;

  @ApiProperty({ type: String, example: '456789' })
  password: string;
}

console.log(CreateUserDto);
