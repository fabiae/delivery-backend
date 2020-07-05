import { 
    Controller, 
    Get, 
    Query, 
    UseGuards, 
    Req, 
    Body, 
    Put, 
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { GetUserService } from './services/get.user.service'
import { States } from '../../@common/enums/states.enum'
import { RolesGuard } from '../../@common/guards/roles.guard'
import { RolesDecorator } from '../../@common/decorators/roles.decorator'
import { Roles } from '../../@common/enums/roles.enum'
import { GetPermissionsService } from './services/get.permissions.service'
import { ChangeLanguage } from './dto/change-language.dto'
import { ChangeLanguageService } from './services/change.language.service'

@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
    constructor(
        private readonly getUserService: GetUserService,
        private readonly getPermissionsService: GetPermissionsService,
        private readonly changeLanguageService: ChangeLanguageService
    ){}

    @Get()
    @RolesDecorator(Roles.ADMIN)
    getUsers(@Query("state") state: States){
        return this.getUserService.getAllUsers(state)
    }

    @Put('/change-language')
    changeLanguage(@Req() req, @Body() body: ChangeLanguage){
        return this.changeLanguageService.changeLanguage(req.user.id, body)
    }

    @Get('/get-permissions')
    getPermissions(@Req() req){
        return this.getPermissionsService.getPermissions(req.user.id)
    }

}
