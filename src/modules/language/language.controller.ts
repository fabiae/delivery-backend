import { Controller, Get, Query } from '@nestjs/common';

import { GetLanguageService } from './services/get.language.service';
import { States } from '../../@common/enums/states.enum';

@Controller('language')
export class LanguageController {
    constructor(
        private readonly getLanguageService: GetLanguageService
    ){}

    @Get('/all')
    getAll(@Query("state") state: States) {
        return this.getLanguageService.getAll(state)
    }
}
