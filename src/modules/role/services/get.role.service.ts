import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Role } from "../../../entities/example/role.entity"
import { States } from "../../../@common/enums/states.enum"
import { GetRole } from "../dto/get-role.dto"

@Injectable()
export class GetRoleService{
    constructor(
        @InjectRepository(Role) 
        private readonly roleRepository: Repository<Role>
    ){}

    async getAll(state: States): Promise<Role[]> {
        const condition = state ?  { state }  : { }
        const roles = await this.roleRepository.find( condition )
        return roles
    }

    async getRole(params: GetRole): Promise<Role> {
        const condition = params.state ? { state: params.state } : { }
        params.id ? condition['id'] = params.id : condition['name'] = params.name
        const role = await this.roleRepository.findOne(condition)
        if(!role)
            throw new NotFoundException('the role does not exist')
        return role
    }
    
}