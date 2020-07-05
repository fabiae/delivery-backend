import { Injectable } from "@nestjs/common"
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
import { GetLanguageService } from "../../language/services/get.language.service"

@Injectable()
export class SignUpService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserRoles)
        private readonly userRolesRepository: Repository<UserRoles>,
        private readonly bcryptService: BcryptService,
        private readonly getRoleService: GetRoleService,
        private readonly getLanguageService: GetLanguageService,
        private readonly sendgridService: SendgridService,
        private readonly signinService: SignInService
    ) { }

    async signUp(body: SignUp): Promise<object> {
        const { username, email, password, roles } = body
        let user
        try {
            user = await this.userRepository.save({
                username, 
                email, 
                password: this.bcryptService.encryption(password)
            })
        } catch (error) {
            return { error: 'CONSTRAINT EMAIL' }
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

        user.language = await this.getLanguageService.getLanguage({ name: 'SPANISH' })

        await this.userRepository.save(user)

        await this.sendgridService.sendEmail(
            user.email,
            Templates.SIGNUP_SUCCESS,
            {
                username: user.username,
                message: '',
            },
        )

        return this.signinService.signIn({ username: user.username, password })
    }

}