import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Injectable } from "@nestjs/common"

import { GetRoleService } from "./get.role.service"
import { Role } from "../../../entities/example/role.entity"

@Injectable()
export class DeleteRoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        private readonly getRoleService: GetRoleService 
    ){}

    async deleteRole(id: number): Promise<object> {
        const deletedRole = await this.roleRepository.delete(id)
        if(deletedRole.affected === 1 )
            return { delete: 'SUCCESS'}
        return { delete: 'FAILED' }
    }
}