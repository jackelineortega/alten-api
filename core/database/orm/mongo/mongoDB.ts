
import mongoose from 'mongoose'
import {ObjectId} from 'mongodb'
import { mongoQueryBuilder } from '../../../../src/utiles'
import { IDataBase } from '../../'

export class MongoDB implements IDataBase {
    
    dbName: string

    private static instance: MongoDB
    private db: any
    n = false
    private MongoNSchema:any
    private static flag: boolean = false

    private constructor(config: any) {
        const { host, user, password, dbName, port } = config
        const credentialsString = user ? `${encodeURIComponent(user)}:${encodeURIComponent(password)}@` : ''
        const portString = port ? `:${port}` : ''
        const url = `mongodb://${credentialsString}${host}${portString}`

        this.dbName = dbName;
        mongoose.set('strictQuery',false);
        mongoose.connect(url);
        this.db = mongoose;
        this.db.connection.on("error", console.error.bind(console, "connection error: "));
        this.db.connection.once("open", function () {
            console.log("Connected successfully");
        });

        const Schema = this.db.Schema;
        // TODO: asignar un schema pos cada collection
        this.MongoNSchema = new Schema({}, { strict: false });
    }

    public static getConnection = (config: any) => {
        if (!MongoDB.flag){
            MongoDB.flag = true
            MongoDB.instance = new MongoDB(config)
        }else{
            if(MongoDB.instance.db.connection.readyState < 1) {
                console.log("state DB::::",MongoDB.instance.db.connection.readyState)
                MongoDB.instance = new MongoDB(config)
            }
        }
        return MongoDB.instance
    }
    isConnected = async ():Promise<boolean> =>{
        if(this.db.connection.readyState !== 1) {
            console.log("state DB cone:::",this.db.connection.readyState)
            return false
        }
        return true
    }
    get = async (id: string, collection: string): Promise<any> => {
        const _id = new ObjectId(id)
        return new Promise((resolve, reject) => {
            try{
                const MongoModel = this.db.model(`${collection}-${new Date().getTime()}`, this.MongoNSchema, collection);
                MongoModel.find({"_id": _id}, function (err:any, docs:any){
                    if (err){
                        console.error("Mongo get - Error en la consulta de datos:::", err)
                        return reject(err)
                    }
                    else{
                        resolve(docs)
                    }
                })
            }catch(e){
                console.log("Error en consulta get MongoDB",e)
            }
        })
    }

    save = async (elem: any, collection: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            try{
                console.log(elem, collection)
                const MongoModel = this.db.model(`${collection}-${new Date().getTime()}`, this.MongoNSchema, collection);
                MongoModel.create(elem, function (err:any, resp:any) {
                    if (err) {
                        return reject(err)
                    }
                    return resolve(resp)
                  });
            }catch(e){
                console.log("Error en save MongoDB",e)
            }
        })
    }

    delete = async (elem: any, collection: string): Promise<boolean> => {
        const _id = new ObjectId(elem.id)
        return new Promise((resolve, reject) => {
            try{
                console.log(elem, collection)
                const MongoModel = this.db.model(`${collection}-${new Date().getTime()}`, this.MongoNSchema, collection);
                MongoModel.deleteOne({"_id": _id}, function (err:any, resp:any) {
                    if (err) {
                        return reject(err)
                    }
                    return resolve(resp)
                  });
            }catch(e){
                console.log("Error en delete MongoDB",e)
            }
        })
    }

    getAll = async (collection: string, limit?: number, sort?:any): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            try{
                const MongoModel = this.db.model(`${collection}-${new Date().getTime()}`, this.MongoNSchema, collection);
                MongoModel.find({}, function (err:any, docs:any){
                    if (err){
                        console.error("Mongo getAll - Error en la consulta de datos:::", err)
                        return reject(err)
                    }
                    else{
                        resolve(docs)
                    }
                }).sort(sort?sort:{}).limit(limit?limit:0)
            }catch(e){
                console.log("Error en getAll MongoDB",e)
            }
        })
    }

    getMany = async (filter: any, collection: string, options?:any): Promise<any[]> => {
        let mongoObj:Object={}
        let projections:Object={}
        if(options){
            mongoObj = options
            if (Array.isArray(options)){
                mongoObj = options[0]
                projections = options[1]
            }
        }else{
             mongoObj = mongoQueryBuilder(filter)
        }

        return new Promise((resolve, reject) => {
            try{
                const MongoModel = this.db.model(`${collection}-${new Date().getTime()}`, this.MongoNSchema, collection);
                MongoModel.aggregate([{$match: mongoObj}], function (err:any, docs:any){
                    if (err){
                        console.error("Mongo getMany - Error en la consulta de datos:::", err)
                        return reject(err)
                    }
                    else{
                        resolve(docs)
                    }
                }).group(({ _id: {"sku":"$sku", "offer":"$offerId"}, quantity: { $sum: "$quantity" } }))
            }catch(errorr){
                console.log("Error en consulta getMany MongoDB",errorr)
            }
        })
    }

    update = async (elem: any, collection: string): Promise<any> => {
        const id = elem.id
        const message = elem.message
        console.debug("incoming json", JSON.parse(message))
        return new Promise((resolve, reject) => {
            try{
                const MongoModel = this.db.model(`${collection}-${new Date().getTime()}`, this.MongoNSchema, collection);
                MongoModel.updateOne({"_id": new ObjectId(id)},
                JSON.parse(message), function (err:any, resp:any) {
                    if (err) {
                        return reject(err)
                    }
                    return resolve(resp)
                  });
            }catch(e){
                console.log("Error en update MongoDB",e)
            }
        })
    }
}
