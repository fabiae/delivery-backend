import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthController } from './auth.controller'
import { SignUpService } from './services/signup.service'
import { User } from '../../entities/example/user.entity'
import { UserRoles } from '../../entities/example/userRoles.entity'
import { RoleModule } from '../role/role.module'
import { SignInService } from './services/signin.service'
import { RecoverPasswordService } from './services/recover.password.service'
import { RecoverPassword } from '../../entities/example/recoverPassword.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRoles, RecoverPassword]),
    RoleModule,
  ],
  controllers: [AuthController],
  providers: [
    SignUpService,
    SignInService,
    RecoverPasswordService
  ]
})
export class AuthModule {}
