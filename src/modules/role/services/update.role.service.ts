import { InjectRepository } from "@nestjs/typeorm"
import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm"

import { Role } from "../../../entities/example/role.entity"
import { GetRoleService } from "./get.role.service"
import { UpdateRole } from "../dto/update-role.dto"
import { States } from "../../../@common/enums/states.enum"

@Injectable()
export class UpdateRoleService {
    constructor(
        @InjectRepository(Role) 
        private readonly roleRepository: Repository<Role>,
        private readonly getRoleService: GetRoleService
    ){}

    async updateRole(id: number, body: UpdateRole): Promise<object> {
        const updatedRole = await this.roleRepository.update(id, body)
        if(updatedRole.affected === 1)
            return { update: 'SUCCESS' }
        return { update: 'FAILED' }
    }

    async setState(id: number): Promise<object> {
        const role = await this.roleRepository.findOne({ id })
        role.state = role.state === States.ACTIVE ? States.INACTIVE : States.ACTIVE
        await this.roleRepository.save(role)
        return { ok: true }
    }
}