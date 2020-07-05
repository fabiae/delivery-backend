import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { States } from "../../../@common/enums/states.enum"
import { UserRoles } from "../../../entities/example/userRoles.entity"

@Injectable()
export class GetPermissionsService {
    constructor(
        @InjectRepository(UserRoles)
        private readonly userRolesRepository: Repository<UserRoles>,
    ){}

    async getPermissions(id: number): Promise<object> {
        const permissions = await this.userRolesRepository
          .createQueryBuilder('user_roles')
          .select(['user_roles.id'])
          .addSelect(['role.name'])
          .innerJoin('user_roles.user', 'user', 'user.id = :id and user.state = :stat', { 
              id, stat: States.ACTIVE 
            })
          .innerJoin('user_roles.role', 'role', 'role.state = :stat', { 
              stat: States.ACTIVE 
            })
          .where('user_roles.state = :state', { state: States.ACTIVE })
          .getMany()
        
        return permissions
    }
}