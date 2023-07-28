
import { sqlQueryBuilder } from '../../../../src/utiles';
import { IDataBase } from '../../'
const mysql = require('mysql');

// TODO: Implementar la lógica particular de mysql
export class MysqlDB implements IDataBase {
    
    private static instance: MysqlDB
    private static flag: boolean
    private connection: any

    private constructor(config: any) {
        this.connection = mysql.createConnection({
            host: config.host,
            user: config.user,
            password: '',
            database: config.database
        });           
        this.connection.connect();          
    }

    public static getConnection = (config: any) => {
        if (!MysqlDB.flag) {
            MysqlDB.flag = true
            MysqlDB.instance = new MysqlDB(config)
        }
        return MysqlDB.instance
    }

    get = async (id: number, table: string): Promise<any> => {
        return new Promise((resolve, reject)=>{
            this.connection.query(`SELECT * FROM ${table} where id=${id}`,  (error: any, results: any) => {
                if(error){
                    return reject(error)
                }
                return resolve(results[0])
            });
        })
    }

    getAll = (table: string, limit?: number): Promise<any[]> => {
        return new Promise((resolve, reject)=>{
            this.connection.query(`SELECT * FROM ${table}`,  (error: any, results: any) => {
                if(error){
                    return reject(error)
                }
                return resolve(results)
            });
        })       
    }

    save = async (elem: any, table: string): Promise<any> => {
        let strSql = `INSERT INTO ${table} (`
        let fields = ''
        let values = ''
        for (let obj in elem) {
            if (obj !== 'id') {
                fields = `${fields}${obj},`
                values = `${values}'${elem[obj]}',`
            }
        }
        fields = fields.substr(0, fields.length - 1)
        values = values.substr(0, values.length - 1)
        strSql = `${strSql}${fields}) values (${values})`
        return new Promise((resolve, reject)=>{
            this.connection.query(strSql,  (error: any, results: any) => {
                if(error){
                    return reject(error)
                }
                return resolve(results)
            });
        })
    }

    delete = async (elem: any, table: string): Promise<boolean> => {
        const { id } = elem
        return new Promise((resolve, reject)=>{
            this.connection.query(`DELETE from ${table} WHERE id=${id}`,  (error: any, results: any) => {
                if(error){
                    return reject(error)
                }
                return resolve(true)
            });
        })
    }

    getMany = async (filter: any, table: string): Promise<any[]> => {
        const strSql = sqlQueryBuilder(filter, table)
        
        return new Promise((resolve, reject)=>{
            this.connection.query(strSql,  (error: any, results: any) => {
                if (error){
                    return reject(error)
                }
                
                return resolve(results)
            });
        })
        /* let strSql = `SELECT * FROM ${table} WHERE `
        filter.forEach((f: {key: string, operator: string, value: any}) => {
            strSql = `${strSql} ${f.key} ${f.operator} ${f.value} AND `
        })
        strSql = strSql.substr(0, strSql.length - 5) // Quitamos el último AND
        return new Promise((resolve, reject)=>{
            this.connection.query(strSql,  (error: any, results: any) => {
                if(error){
                    return reject(error)
                }
                return resolve(results)
            });
        }) */
    }

    update = async (elem: any, table: string): Promise<any> => {
        let strSql = `UPDATE ${table} SET `
        let condition = ' WHERE id = '
        let values = ''
        for (let obj in elem) {
            if (obj === 'id') {
                condition = `${condition} ${elem[obj]}`
            } else {                
                values = `${values} ${obj} = '${elem[obj]}',`
            }
        }
        values = values.substr(0, values.length - 1)
        strSql = `${strSql}${values} ${condition}`
        return new Promise((resolve, reject)=>{
            this.connection.query(strSql,  (error: any, results: any) => {
                if(error){
                    return reject(error)
                }
                return resolve(results)
            });
        })
    }
}
