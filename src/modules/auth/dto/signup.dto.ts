import { 
  IsNotEmpty, 
  IsString, 
  IsEmail, 
  IsOptional, 
  IsArray
} from 'class-validator'

import { Roles } from '../../../@common/enums/roles.enum'

export class SignUp {
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  @IsString()
  readonly password: string

  @IsOptional()
  @IsArray()
  readonly roles: Roles[]
}
