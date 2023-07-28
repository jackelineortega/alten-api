
import { provide } from 'inversify-binding-decorators'

import { Entity } from './entity'
import { TYPES } from '../config/types'
import { Repository } from './repository'

@provide(TYPES.IBaseService)
export class BaseService {
    public repository: Repository
    private body: any
    constructor(repository: Repository){
        this.repository = repository
        this.body = {}
    }

    public index = async (): Promise<Entity[]> => {
        try {
            return await this.repository.index()
        } catch(err) {
            throw new Error(JSON.stringify(err))
        }
    }

    public create = async (): Promise<Entity|Object> => {
        try {
            return await this.repository.create(this.body.elem)
        } catch(err) {
            throw new Error(JSON.stringify(err))
        }
    }

    public get = async (): Promise<Entity|Object> => {
        try {
            return await this.repository.get(this.body.id)
        } catch(err) {
            throw new Error(JSON.stringify(err))
        }
    }

    public getMany = async (): Promise<Entity|Object> => {
        try {
            return await this.repository.getMany(this.body)
        } catch(err) {
            throw new Error(JSON.stringify(err))
        }
    }

    public update = async (): Promise<Entity|Object> => {
        try {
            return await this.repository.update(this.body.elem)
        } catch(err) {
            throw new Error(JSON.stringify(err))
        }
    }

    public delete = async (): Promise<boolean> => {
        try {        
            return await this.repository.delete(this.body.id)
        } catch(err) {
            throw new Error(JSON.stringify(err))
        }
    }
}