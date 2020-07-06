import { ConfigService } from "@nestjs/config"
import { Injectable } from "@nestjs/common"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sgMail = require('@sendgrid/mail')

export const Templates = {
    SIGNUP_SUCCESS: {
        id: 'd-306ae57b3b394179a5ba1d098e65e5e9',
        subject: 'Bienvenido a delivery'
    },
    RECOVER_PASSWORD: {
        id: 'd-ab0e7d558ca64c68abffe44fc9c05547',
        subject: 'Codigo de verificacion'
    }
}

@Injectable()
export class SendgridService {

    private readonly config: any

    constructor(private readonly configService: ConfigService){
        this.config = configService.get('sendgrid')
        sgMail.setApiKey(this.config.apiKey)
    }

    sendEmail(to: any, template: any, substitutions: any){
        return new Promise((resolve, reject) =>{
            const msg = {
                to,
                from: this.config.fromEmail || substitutions.from,
                templateId: template.id,
                // eslint-disable-next-line @typescript-eslint/camelcase
                dynamic_template_data: {
                    ...substitutions,
                    subject: template.subject || substitutions.subject
                }
            }

            sgMail.send(msg)
                .then(data => {
                    if(data[0] && data[0].statusCode === 202)
                        resolve({ success: 'OK', ...data })
                    else resolve({ success: 'OK', ...data })
                })
                .catch(err => {
                    resolve({ error: 'ERROR', ...err })
                })
        })
    }
}