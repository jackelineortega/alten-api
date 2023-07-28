
import { Repository } from '@base/repository'
import { EchoEntity } from "@modules/echo/application/entities/echo.entity"
import { IConfig } from '@config/index'

export class EchoRepository extends Repository {
    constructor(config: IConfig) {
        super(new EchoEntity(), 'echo',config)
    }
}
