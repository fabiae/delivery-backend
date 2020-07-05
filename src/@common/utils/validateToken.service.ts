import { Injectable, UnauthorizedException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { User } from "../../entities/example/user.entity"
import { States } from "../enums/states.enum"

@Injectable()
export class ValidateToken {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async validateToken(token: any){
        const { id, name, email } = token
        const user = await this.userRepository.findOne({
            where: { id, name, email, state: States.ACTIVE }
        })
        if(!user)
            throw new UnauthorizedException('invalid or expired token')
        return true
    }
}