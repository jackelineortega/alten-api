
import { IDataBase } from '../../'
// Imports the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery')
const bigquery = new BigQuery();      

require('dotenv').config();

export class BigqueryService implements IDataBase {
    private static instance: BigqueryService
    private static flag: boolean = false
    private constructor(config: any) {
        // TODO: Realizar la autenticación con GCP
    }

    public static getConnection = (config: any) => {
        if (!BigqueryService.flag) {
          BigqueryService.flag = true
          BigqueryService.instance = new BigqueryService(config)
        }
        return BigqueryService.instance 
    }

    // @override
    public save = async (elem: any, table: string): Promise<boolean> => {
        console.log('BIGQUERY INSTANCE')
        const datasetId = process.env.BIGQUERY_DATASET_ID
        const tableId = process.env.BIGQUERY_TABLE_ID
        try {
            const rows = [elem]          
            // Insert data into a table
            return await bigquery
              .dataset(datasetId)
              .table(tableId)
              .insert(rows)            
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
