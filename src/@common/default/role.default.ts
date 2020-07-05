import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Role } from "../../entities/example/role.entity"

export const ROLES = [
    { name: 'ADMIN', description: 'app admin role' },
    { name: 'CLIENT', description: 'app client role' }
]

export class RoleDefault {
    constructor(
        @InjectRepository(Role)
        private readonly repository: Repository<Role>
    ){
        ROLES.map(role => this.create(role))
    }

    async create(_object: any){
        const _new = this.repository.create(_object)

        const isExist = await this.repository.findOne({ where: { name: _object.name }})
        if(isExist)
            return
        
        return this.repository.save(_new)
    }
}