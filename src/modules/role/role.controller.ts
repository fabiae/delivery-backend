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
import { GetRoleService } from './services/get.role.service'
import { CreateRoleService } from './services/create.role.service'
import { DeleteRoleService } from './services/delete.role.service'
import { UpdateRoleService } from './services/update.role.service'
import { GetRole } from './dto/get-role.dto'
import { CreateRole } from './dto/create-role.dto'
import { UpdateRole } from './dto/update-role.dto'
import { Roles } from '../../@common/enums/roles.enum'
import { States } from '../../@common/enums/states.enum'

@Controller('role')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@RolesDecorator(Roles.ADMIN)
export class RoleController {
    constructor(
        private readonly getRoleService: GetRoleService,
        private readonly createRoleService: CreateRoleService,
        private readonly updateRoleService: UpdateRoleService,
        private readonly deleteRoleService: DeleteRoleService
    ) { }

    @Get('/all')
    getAll(@Query("state") state: States) {
        return this.getRoleService.getAll(state)
    }

    @Get()
    getRole(@Query() params: GetRole) {
        return this.getRoleService.getRole(params)
    }

    @Post()
    createRole(@Body() body: CreateRole) {
        return this.createRoleService.createRole(body)
    }

    @Put('/:id')
    updateRole(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateRole) {
        return this.updateRoleService.updateRole(id, body)
    }

    @Put('/set-state/:id')
    setState(@Param('id', ParseIntPipe) id: number) {
        return this.updateRoleService.setState(id)
    }

    @Delete('/:id')
    deleteRole(@Param('id', ParseIntPipe) id: number) {
        return this.deleteRoleService.deleteRole(id)
    }
}
