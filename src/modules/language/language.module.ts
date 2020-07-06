import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LanguageController } from './language.controller';
import { Language } from '../../entities/example/language.entity';
import { GetLanguageService } from './services/get.language.service';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  controllers: [LanguageController],
  providers: [GetLanguageService]
})
export class LanguageModule {}
