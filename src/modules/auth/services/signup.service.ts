import { Injectable, BadRequestException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { User } from "../../../entities/example/user.entity"
import { BcryptService } from "../../../@common/utils/bcrypt.service"
import { Roles } from '../../../@common/enums/roles.enum'
import { SignUp } from "../dto/signup.dto"
import { UserRoles } from "../../../entities/example/userRoles.entity"
import { GetRoleService } from "../../role/services/get.role.service"
import { SendgridService, Templates } from "../../../@common/utils/sendgrid.service"
import { SignInService } from "./signin.service"

@Injectable()
export class SignUpService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserRoles)
        private readonly userRolesRepository: Repository<UserRoles>,
        private readonly bcryptService: BcryptService,
        private readonly getRoleService: GetRoleService,
        private readonly sendgridService: SendgridService,
        private readonly signinService: SignInService
    ) { }

    async signUp(body: SignUp): Promise<object> {
        const { name, email, password, roles } = body
        let user
        try {
            user = await this.userRepository.save({
                name, 
                email, 
                password: this.bcryptService.encryption(password)
            })
        } catch (error) {
            throw new BadRequestException('Constraint email')
        }

        if(roles){
            roles.forEach(async role => {
                const rol = await this.getRoleService.getRole({name: role})
                await this.userRolesRepository.save({ user, role: rol })
            })
        }else{
            const defaultRole = await this.getRoleService.getRole({ name: Roles.CLIENT }) 
            await this.userRolesRepository.save({ user, role: defaultRole })
        }

        await this.userRepository.save(user)

        await this.sendgridService.sendEmail(
            user.email,
            Templates.SIGNUP_SUCCESS,
            {
                name: user.name,
                message: '',
            },
        )

        return this.signinService.signIn({ email: user.email, password })
    }

}