import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Language } from "../../../entities/example/language.entity"
import { States } from "../../../@common/enums/states.enum"

@Injectable()
export class GetLanguageService {
    constructor(
        @InjectRepository(Language)
        private readonly languageRepository: Repository<Language>
    ){}

    async getAll(state: States): Promise<Language[]> {
        const condition = state ? { state } : { state: States.ACTIVE }
        const languages = await this.languageRepository.find(condition)
        return languages
    }
}