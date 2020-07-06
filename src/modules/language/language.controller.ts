import { 
    Controller, 
    Get, 
    Query, 
    Post, 
    UseGuards, 
    Body, 
    Put,
    Param,
    ParseIntPipe,
    Delete
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { RolesGuard } from '../../@common/guards/roles.guard'
import { RolesDecorator } from '../../@common/decorators/roles.decorator'
import { GetLanguageService } from './services/get.language.service'
import { CreateLanguageService } from './services/create.language.service'
import { UpdateLanguageService } from './services/update.language.service'
import { DeleteLanguageService } from './services/delete.language.service'
import { CreateLanguage } from './dto/create-language.dto'
import { UpdateLanguage } from './dto/update-language.dto'
import { Roles } from '../../@common/enums/roles.enum'
import { States } from '../../@common/enums/states.enum'

@Controller('language')
export class LanguageController {
    constructor(
        private readonly getLanguageService: GetLanguageService,
        private readonly createLanguageService: CreateLanguageService,
        private readonly updateLanguageService: UpdateLanguageService,
        private readonly deleteLanguageService: DeleteLanguageService
    ) { }

    @Get('/all')
    getAll(@Query("state") state: States) {
        return this.getLanguageService.getAll(state)
    }

    @Post()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @RolesDecorator(Roles.ADMIN)
    createLanguage(@Body() body: CreateLanguage) {
        return this.createLanguageService.createLanguage(body)
    }

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @RolesDecorator(Roles.ADMIN)
    updateLanguage(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateLanguage) {
        return this.updateLanguageService.updateLanguage(id, body)
    }

    @Put('/set-state/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @RolesDecorator(Roles.ADMIN)
    setState(@Param('id', ParseIntPipe) id: number) {
        return this.updateLanguageService.setState(id)
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @RolesDecorator(Roles.ADMIN)
    deleteLanguage(@Param('id', ParseIntPipe) id: number) {
        return this.deleteLanguageService.deleteLanguage(id)
    }

}
