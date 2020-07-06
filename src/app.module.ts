import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CommonModule } from './@common/common.module'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { LanguageModule } from './modules/language/language.module';
import sendgridConfig from './@common/config/sendgrid.config'
import typeormConfig from './@common/config/typeorm.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [typeormConfig, sendgridConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm.example') 
    }),
    CommonModule,
    AuthModule,
    UserModule,
    LanguageModule,
  ]
})
export class AppModule {}
