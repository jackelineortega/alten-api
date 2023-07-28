
import { IDataBase } from '../../'
// Imports the Google Cloud client library
const {Datastore} = require('@google-cloud/datastore')
// Creates a client
const datastore = new Datastore();

require('dotenv').config()

export class DatastoreService implements IDataBase {
    private static instance: DatastoreService
    private static flag: boolean = false

    private constructor(config: any) {
        // TODO: implementar la autenticación con GCP y conección al kin
    }

    public static getConnection = (config: any) => {
        if (!DatastoreService.flag) {
          DatastoreService.flag = true
          DatastoreService.instance = new DatastoreService(config)
        }
        return DatastoreService.instance 
    }

    // @override
    public save = async (elem: any, table: string): Promise<boolean> => {
        try {
            // The kind for the new entity
            const kind = process.env.DATASTORE_KIND

            // The name/ID for the new entity
            const name = process.env.DATASTORE_ENTITY

            // The Cloud Datastore key for the new entity
            const taskKey = datastore.key([kind, name])

            // Prepares the new entity
            const task = {
                key: taskKey,
                data: elem,
            }

            // Saves the entity
            return await datastore.save(task)
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
