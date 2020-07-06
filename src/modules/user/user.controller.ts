import { 
    Controller, 
    Get, 
    Query, 
    UseGuards, 
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { GetUserService } from './services/get.user.service'
import { RolesGuard } from '../../@common/guards/roles.guard'
import { RolesDecorator } from '../../@common/decorators/roles.decorator'
import { Roles } from '../../@common/enums/roles.enum'

@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
    constructor(
        private readonly getUserService: GetUserService,
    ){}

    @Get()
    @RolesDecorator(Roles.ADMIN)
    getUsers(@Query("role") role: Roles){
        return this.getUserService.getAllUsers(role)
    }

}
