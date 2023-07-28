
import { Repository } from '@base/repository'
import { ReadingEntity } from "@modules/reading/application/entities/reading.entity"
import { IConfig } from '@config/index'

export class ReadingRepository extends Repository {
    constructor(config: IConfig) {
        super(new ReadingEntity(), 'reading',config)
    }
}
