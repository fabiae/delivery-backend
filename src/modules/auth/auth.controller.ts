import { Controller, Get, Query, Post, Body } from '@nestjs/common'

import { SignUpService } from './services/signup.service'
import { SignUp } from './dto/signup.dto'
import { SignIn } from './dto/signin.dto'
import { SignInService } from './services/signin.service'
import { RecoverPasswordService } from './services/recover.password.service'
import { ValidateCode } from './dto/validate-code.dto'
import { RecoverPass } from './dto/recover-pass.dto'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly signupService: SignUpService,
        private readonly signinService: SignInService,
        private readonly recoverPasswordService: RecoverPasswordService
    ) { }

    @Post('/signup')
    signUp(@Body() body: SignUp) {
        return this.signupService.signUp(body)
    }

    @Post("/signin")
    signIn(@Body() body: SignIn) {
        return this.signinService.signIn(body)
    }

    @Get('/send-code')
    sendCode(@Query("email") email: string) {
        if (!email)
            return null
        return this.recoverPasswordService.sendCode(email)
    }

    @Post('/validate-code')
    validateCode(@Body() body: ValidateCode) {
        return this.recoverPasswordService.validateCode(body)
    }

    @Post('/new-password')
    newPassword(@Body() body: RecoverPass) {
        return this.recoverPasswordService.newPassword(body)
    }
}
