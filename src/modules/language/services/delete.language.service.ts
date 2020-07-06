import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Language } from "../../../entities/example/language.entity"
import { GetLanguageService } from "./get.language.service"

@Injectable()
export class DeleteLanguageService {
    constructor(
        @InjectRepository(Language)
        private readonly languageRepository: Repository<Language>,
        private readonly getLanguageService: GetLanguageService
    ){}

    async deleteLanguage(id: number): Promise<object> {
        const deletedLanguage = await this.languageRepository.delete(id)
        if(deletedLanguage.affected === 1)
            return { delete: 'SUCCESS' }
        return { delete: 'FAILED' }
    }
}