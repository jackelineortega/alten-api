import { IConfig } from '../config'
import { TYPES } from '../config/types'
import { inject } from 'inversify'
import { IMessaging } from '../core/messaging'

export class Logger{
    public config: IConfig
    public static messager: IMessaging
    constructor(@inject(TYPES.IConfig) config: IConfig) {
        this.config = config
        Logger.messager = this.config.get().messaging
    }

    // @description publish message 
    public debug = async (elem:any): Promise<any> => {
        try {
            const resp: any = await Logger.messager.debug(elem)
            return resp
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }

    public error = async (elem:any,typeError:string): Promise<any> => {
        try {
            const resp: any = await Logger.messager.error(elem,typeError)
            return resp
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }

    public info = async (elem:any, elem2:any): Promise<any> => {
        try {
            const resp: any = await Logger.messager.info(elem,elem2)
            return resp
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }    

    public legal = async (elem:any, elem2:any,elem3:any): Promise<any> => {
        try {
            const resp: any = await Logger.messager.legal(elem,elem2,elem3)
            return resp
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }
    public operational = async (elem:any, elem2:any,elem3:any): Promise<any> => {
        try {
            const resp: any = await Logger.messager.operational(elem,elem2,elem3)
            return resp
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }   
}