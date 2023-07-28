
import { randomUUID } from 'crypto';
import { IDataBase } from '../../'

const elasticsearch = require('elasticsearch');
const elasticClient = elasticsearch.Client({
  host: process.env.ELASTIC_HOST
})
require('dotenv').config()

export class ElasticService implements IDataBase {
    
  private static instance: ElasticService
  private static flag: boolean = false
  
  private constructor(config: any) {
      // TODO: realizar la conneción con elasticserach
  }

  public static getConnection = (config: any) => {
    if (!ElasticService.flag) {
      ElasticService.flag = true
      ElasticService.instance = new ElasticService(config)
    }
    return ElasticService.instance 
  }
        
    // @override
  public save = async (elem: any, table: string): Promise<boolean> => {
    try {
      return await elasticsearch.client ({
        index: process.env.ELASTIC_INDEX,
        type: process.env.ELASTIC_TYPE,
        id: randomUUID,
        body: elem
      }, function(err: any, resp: any) {
        if (err) {
          return false
        } else {
          return true
        }
      })  
    } catch (err) {
      return false
    }
  }

  public get = async (id: number, table: string): Promise<any> => {
    return true
  }

  public getAll = async (table: string, limit?: number): Promise<any[]> => {
    return [ true ]
  }

  public getMany = async (filter: any, table: string): Promise<any[]> => {
      return [ true ]
  }

  public delete = async (elem: any, table: string): Promise<boolean> => {
    return true
  }

  public update = async (elem: any, table: string): Promise<any> => {
    return true
  }

}
