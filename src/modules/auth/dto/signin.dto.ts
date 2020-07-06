import { IsString, IsNotEmpty } from 'class-validator'

export class SignIn {
    @IsNotEmpty()
    @IsString()
    readonly email: string

    @IsNotEmpty()
    @IsString()
    readonly password: string
}
