import { Module, Global } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { BcryptService } from './utils/bcrypt.service'
import { SendgridService } from './utils/sendgrid.service'
import { ValidateToken } from './utils/validateToken.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { User } from '../entities/example/user.entity'
import { Role } from '../entities/example/role.entity'
import { Language } from '../entities/example/language.entity'
import { LanguageDefault } from './default/language.default'
import { RoleDefault } from './default/role.default'
import { UserDefault } from './default/user.default'
import { UserRoles } from '../entities/example/userRoles.entity'

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role, Language, UserRoles]),
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get('JWT_KEY'),
            signOptions: { expiresIn: '2 days' },
          }),
        }),
    ],
    providers: [
      BcryptService, 
      SendgridService, 
      ValidateToken, 
      JwtStrategy,
      LanguageDefault,
      RoleDefault,
      UserDefault
    ],
    exports: [
      BcryptService,
      SendgridService,
      JwtStrategy,
      JwtModule,
    ]
})
export class CommonModule {}
