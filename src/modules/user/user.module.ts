import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserController } from './user.controller'
import { User } from '../../entities/example/user.entity'
import { GetUserService } from './services/get.user.service'
import { GetPermissionsService } from './services/get.permissions.service'
import { UserRoles } from '../../entities/example/userRoles.entity'
import { RoleModule } from '../role/role.module'
import { ChangeLanguageService } from './services/change.language.service'
import { LanguageModule } from '../language/language.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRoles]),
    RoleModule,
    LanguageModule
  ],
  controllers: [UserController],
  providers: [
    GetUserService,
    GetPermissionsService,
    ChangeLanguageService
  ]
})
export class UserModule {}
