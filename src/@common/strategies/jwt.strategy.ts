import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Strategy, ExtractJwt } from 'passport-jwt'

import { User } from '../../entities/example/user.entity'
import { ValidateToken } from '../utils/validateToken.service'
import { Roles } from '../enums/roles.enum'

interface JwtPayload {
    id: number,
    name: string,
    email: string,
    roles: Roles[],
    iat?: Date
}

export function getToken(user: User) {

    const payload: JwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.userRoles.map(userRole => userRole.role.name as Roles),
    }
    return payload
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    
    constructor(
        private readonly validateToken: ValidateToken,
        private readonly configService: ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_KEY')
        })
    }

    async validate(payload: JwtPayload): Promise<JwtPayload> {
        await this.validateToken.validateToken(payload)
        return payload
    }

}