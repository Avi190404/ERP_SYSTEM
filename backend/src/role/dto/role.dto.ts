import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
} from 'class-validator';

export class roleDto {
  @IsString()
  @IsNotEmpty()
  roleName: string;

  @IsObject()
  @IsNotEmptyObject()
  permissions: Record<string, number>;
}
