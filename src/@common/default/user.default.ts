import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { User } from "../../entities/example/user.entity"
import { Roles } from "../enums/roles.enum"
import { BcryptService } from "../utils/bcrypt.service"
import { UserRoles } from "../../entities/example/userRoles.entity"
import { Role } from "../../entities/example/role.entity"

export const USERS = [
    { 
        name: 'admin', 
        email: 'admin@email.com', 
        password: 'admin', 
        role: Roles.ADMIN
    },
    {
        name: 'client', 
        email: 'client@email.com', 
        password: 'client', 
        role: Roles.CLIENT
    }
]

export class UserDefault {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
        @InjectRepository(UserRoles)
        private readonly rolesRepository: Repository<UserRoles>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        private readonly bcryptService: BcryptService
    ){
        setTimeout(() => {
            USERS.map(user => this.create(user))
        }, 1000)       
    }

    async create(_object: any){
        const { name, email, password, role } = _object

        const isExist = await this.repository.findOne({ where: { name: _object.name }})
        if(isExist)
            return

        const _new = await this.repository.save({
            name,
            email,
            password: this.bcryptService.encryption(password)
        })

        _new.userRoles = [await this.rolesRepository.save({
            user: _new,
            role: await this.roleRepository.findOne({ name: role })
        })]

        return this.repository.save(_new)
    }
}