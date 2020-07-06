import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { User } from "../../../entities/example/user.entity"
import { States } from "../../../@common/enums/states.enum"
import { Roles } from "../../../@common/enums/roles.enum"


@Injectable()
export class GetUserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async getAllUsers(role: Roles){
        const users = this.userRepository
            .createQueryBuilder('user')
            .select(['user.id', 'user.name', 'user.email', 'user.state'])
            .innerJoin('user.userRoles', 'roles', 'roles.state = :stat', { stat: States.ACTIVE })
            .innerJoin('roles.role', 'role', 'role.name = :role and role.state = :stat', { role, stat: States.ACTIVE })
            .getMany()
        return users
    }
}