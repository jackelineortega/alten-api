
import { Entity } from './entity'

import { IDataBase } from '../core/database'
import { Config, IConfig } from '../config'
import { TYPES } from '../config/types'
import { inject } from 'inversify'
import { getDataBase } from '@config/database'

export class Repository {
    private entity: Entity
    private table: string // Tabla o collection dependiendo si es relacional o no relacional
    public static db: IDataBase
    public config: IConfig

    constructor(entity: Entity, table: string, @inject(TYPES.IConfig) config: IConfig) {
        this.config = config
        this.entity = entity
        this.table = table
        Repository.db = this.config.get().database
    }

    // @description obtain all register
    // TODO: agregar la opción de limitar la cantidad de registros a retornar
    public index = async (order?:any, limit?:number): Promise<Entity[]> => {
        try {
            if(Repository.db.isConnected && !await Repository.db.isConnected()){
                console.log("desconectado")
                Repository.db = getDataBase()
            }
            const arr: Entity[] = await Repository.db.getAll(this.table, limit?limit:0, order?order:null)
            return arr
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }

    public create = async (elem: Entity|Object): Promise<Entity|Object> => {
        try {
            if(Repository.db.isConnected && !await Repository.db.isConnected()){
                console.log("desconectado")
                Repository.db = getDataBase()
            }
            const newElem: any = await Repository.db.save(elem, this.table)
            return newElem
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }

    public get = async (filters: any): Promise<Entity|Object> => {
        try {
            if(Repository.db.isConnected && !await Repository.db.isConnected()){
                console.log("desconectado")
                Repository.db = getDataBase()
            }
            const elem: any = await Repository.db.get(filters, this.table)
            return elem
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }

    public getMany = async (elem: Entity,options?:any): Promise<Entity|Object[]> => {
        try {
            if(Repository.db.isConnected && !await Repository.db.isConnected()){
                console.log("desconectado")
                Repository.db = getDataBase()
            }
            const arr: Entity[]|Object[] = await Repository.db.getMany(elem, this.table,options?options:null)
            return arr
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }

    public update = async (elem: Entity|Object): Promise<Entity|Object> => {
        try {
            if(Repository.db.isConnected && !await Repository.db.isConnected()){
                console.log("desconectado")
                Repository.db = getDataBase()
            }
            const updatedElem: any = await Repository.db.update(elem, this.table)
            return updatedElem
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }

    public delete = async (elem: Entity): Promise<boolean> => {
        try {
            if(Repository.db.isConnected && !await Repository.db.isConnected()){
                console.log("desconectado")
                Repository.db = getDataBase()
            }
            const deleted: boolean = await Repository.db.delete(elem, this.table)
            return deleted
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }

    private build = () => {
        return true
    }
}
