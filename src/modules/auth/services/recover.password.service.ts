import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Templates, SendgridService } from "../../../@common/utils/sendgrid.service"
import { User } from "../../../entities/example/user.entity"
import { RecoverPassword } from "../../../entities/example/recoverPassword.entity"
import { BcryptService } from "../../../@common/utils/bcrypt.service"
import { ValidateCode } from "../dto/validate-code.dto"
import { States } from "../../../@common/enums/states.enum"
import { RecoverPass } from "../dto/recover-pass.dto"


@Injectable()
export class RecoverPasswordService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RecoverPassword)
    private readonly recoverPasswordRepository: Repository<RecoverPassword>,
    private readonly sendgridService: SendgridService,
    private readonly bcryptService: BcryptService
  ) { }

  async sendCode(email: string): Promise<object> {
    const userExist = await this.userRepository.findOne({
      where: { email: email, state: States.ACTIVE },
    })
    if (!userExist)
      throw new NotFoundException('Wrong email')

    const randomCode = Math.floor(Math.random() * (999999 - 99999)) + 99999

    await this.recoverPasswordRepository.save({ code: randomCode, userId: userExist.id })

    await this.sendgridService.sendEmail(email, Templates.RECOVER_PASSWORD, {
      code: randomCode,
    })

    return {
      userId: userExist.id,
      ok: true,
    }
  }

  async validateCode(body: ValidateCode): Promise<object> {
    const recover = await this.recoverPasswordRepository.findOne({
      where: { userId: body.id, code: body.code }
    })
    if (!recover)
      throw new BadRequestException('wrong code entered')

    const current = new Date()
    if (current.getTime() - recover.createAd.getTime() > 600000) {
      recover.state = 'EXPIRED'
      await this.recoverPasswordRepository.save(recover)
      throw new UnauthorizedException('code expired')
    }

    recover.state = 'SUCCESS'
    await this.recoverPasswordRepository.save(recover)
    return { userId: body.id, ok: true }
  }

  async newPassword(body: RecoverPass): Promise<object> {
    const { id, password } = body

    const userExist = await this.userRepository.findOne({
      where: { id, state: States.ACTIVE },
    })
    if (!userExist)
      throw new NotFoundException('user does not exists')

    const newPassword = this.bcryptService.encryption(password)

    await this.userRepository.update(id, {
      password: newPassword,
    })

    return {
      restorePassword: 'SUCCESS',
      ok: true,
    }
  }
}