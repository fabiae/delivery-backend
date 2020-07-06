import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserController } from './user.controller'
import { User } from '../../entities/example/user.entity'
import { GetUserService } from './services/get.user.service'
import { UserRoles } from '../../entities/example/userRoles.entity'
import { RoleModule } from '../role/role.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRoles]),
    RoleModule,
  ],
  controllers: [UserController],
  providers: [
    GetUserService,
  ]
})
export class UserModule {}
