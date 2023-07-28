
import { provide } from 'inversify-binding-decorators'

import { TYPES } from '@config/types'
import { IEchoService } from '.'
import { EchoRepository } from '@modules/echo/application/repositories/echo.repository'
import { EchoEntity } from '@modules/echo/application/entities/echo.entity'
import { inject } from 'inversify'
import { IConfig } from '@config/index'

@provide(TYPES.EchoService)
export class EchoService implements IEchoService {
    public repo: EchoRepository
    constructor(@inject(TYPES.IConfig) private config: IConfig) {
        this.repo = new EchoRepository(this.config)
    }

    public show = async (message: string): Promise<string> => 'This is the template service ' + message 
        
    public index = async () => await this.repo.index()

    public get = async (id: number) => await this.repo.get(id)

    public getMany = async (elem: EchoEntity) => await this.repo.getMany(elem)
    
    public create = async (elem: EchoEntity) => await this.repo.create(elem)

    public update = async (elem: EchoEntity) => await this.repo.update(elem)

    public delete = async (elem: EchoEntity) => await this.repo.delete(elem)
}
