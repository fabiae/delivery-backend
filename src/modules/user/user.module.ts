import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserController } from './user.controller'
import { User } from '../../entities/example/user.entity'
import { GetUserService } from './services/get.user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [
    GetUserService,
  ]
})
export class UserModule {}
