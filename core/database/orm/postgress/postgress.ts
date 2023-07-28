
const postgres = require('postgres')
import { IDataBase } from '../../'

// TODO: Implementar la lógica particular de mysql
export class PostgressSqlDB implements IDataBase {
    
    private static instance: PostgressSqlDB
    private static flag: boolean

    private constructor(config: any) {
        // TODO: REALIZAR LA CONECCIÓB CON LA BASE DE DATOS POSTGRESSSQL
    }

    public static getConnection = (config: any) => {
        if (!PostgressSqlDB.flag) {
            PostgressSqlDB.flag = true
            PostgressSqlDB.instance = new PostgressSqlDB(config)
        }
        return PostgressSqlDB.instance
    }

    get = async (id: number, table: string): Promise<any> => {
        return true
    }

    getAll = async (table: string, limit?: number): Promise<any[]> => {
        console.log('Procesado por postGress')
        return [ {id: 3, name: 'Postgress'} ]
    }

    save = async (elem: any, table: string): Promise<any> => {
        return true
    }

    delete = async (elem: any, table: string): Promise<any> => {
        return true
    }

    getMany = async (filter: any, table: string) => {
        return [ true ]
    }

    update = async (elem: any, table: string): Promise<any> => {
        return true
    }
}
