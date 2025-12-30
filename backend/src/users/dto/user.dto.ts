import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class userDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be atleast 6 characters long' })
  @MaxLength(8, { message: 'Password must be atmost 8 characters long' })
  password: string;

  @IsString()
  @IsNotEmpty()
  roleName: string;
}

export class signInDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be atleast 6 characters long' })
  @MaxLength(8, { message: 'Password must be atmost 8 characters long' })
  password: string;
}
