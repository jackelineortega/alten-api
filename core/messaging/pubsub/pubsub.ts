import { IMessaging } from "..";
import {PubSub} from '@google-cloud/pubsub'
import { TYPES_CONSOLE_LEVEL, TYPES_C_LEVEL, TYPES_LEVEL, TYPES_MESSAGING_LEVEL} from "../../../config/types.enum";
import process from "process";
import { IConfig } from "../../../config/index";
  

export class PubSubLogger implements IMessaging{
    private static instance: PubSubLogger
    private static flag: boolean
    pubsub:any
    topicName:any=''
    consoleLevel:TYPES_C_LEVEL=TYPES_C_LEVEL.DEBUG
    messagingLevel:TYPES_LEVEL=TYPES_LEVEL.LEGAL
    


    private constructor(config: any) {
        this.pubsub = new PubSub();
        this.topicName= config.topic
        this.consoleLevel= config.consoleLevel
        this.messagingLevel= config.messagingLevel || TYPES_LEVEL.LEGAL
    }

    public static getInstance = (config: any) => {
        if (!PubSubLogger.flag) {
            PubSubLogger.flag = true
            PubSubLogger.instance = new PubSubLogger(config)
        }
        return PubSubLogger.instance
    }

    debug= async (data: string): Promise<any> =>{
        const dataPublish={
            type:TYPES_LEVEL.DEBUG,
            message:data,
            origen:'api-sales-service',
        }
        if(process.env.DATABASE_DEBUG){
            Object.assign(dataPublish, {
                database: process.env.DATABASE_DEBUG
            })
        }
        const dataBuffer = Buffer.from(JSON.stringify(dataPublish))
        const fechaLog = new Date().toISOString()
        return new Promise((resolve, reject) => {
            const level = {
                console:TYPES_CONSOLE_LEVEL[this.consoleLevel],
                messaging:TYPES_MESSAGING_LEVEL[this.messagingLevel],
            }
            if(level.console <= TYPES_CONSOLE_LEVEL.DEBUG){
               console.debug(`[${fechaLog}] [${this.consoleLevel}]: ${dataPublish.message}`)
            }
            if(level.messaging > TYPES_MESSAGING_LEVEL.DEBUG){
                return resolve(true)
            }
            this.pubsub
            .topic(this.topicName)
            .publish(dataBuffer)
            .then((messageId: string) => {
              console.log(`Message ${messageId} published.`);
              return resolve(messageId)
            })
            .catch((err: any) => {
              console.error('ERROR:', err);
              reject(err)
            });
        })
    }

    error= async (data: string,typeError:string): Promise<any> =>{
        const dataPublish={
            type:TYPES_LEVEL.ERROR,
            typeError, 
            message:data,
            origen:'api-sales-service',
        }
        if(process.env.DATABASE_ERROR){
            Object.assign(dataPublish, {
                database: process.env.DATABASE_ERROR
            })
        }
        const dataBuffer = Buffer.from(JSON.stringify(dataPublish))
        const fechaLog = new Date().toISOString()
        return new Promise((resolve, reject) => {
            const level = {
                console:TYPES_CONSOLE_LEVEL[this.consoleLevel],
                messaging:TYPES_MESSAGING_LEVEL[this.messagingLevel],
            }
            if(level.console <= TYPES_CONSOLE_LEVEL.ERROR){
               console.error(`[${fechaLog}] [${this.consoleLevel}]: ${dataPublish.message}`)
            }
            if(level.messaging > TYPES_MESSAGING_LEVEL.ERROR){
                return resolve(true)
             }
            this.pubsub
            .topic(this.topicName)
            .publish(dataBuffer)
            .then((messageId: string) => {
              console.log(`Message ${messageId} published.`);
              return resolve(messageId)
            })
            .catch((err: any) => {
              console.error('ERROR:', err);
              reject(err)
            });
        })
    } 
    
    info= async (component: string, description: string): Promise<any> =>{
        const dataPublish={
            type:TYPES_LEVEL.INFO,
            component, // TODO: validar 
            description, // TODO: validar
            origen:'api-sales-service',
        }
        if(process.env.DATABASE_INFO){
            Object.assign(dataPublish, {
                database: process.env.DATABASE_INFO
            })
        }
        const dataBuffer = Buffer.from(JSON.stringify(dataPublish))
        const fechaLog = new Date().toISOString()
        return new Promise((resolve, reject) => {
            const level = {
                console:TYPES_CONSOLE_LEVEL[this.consoleLevel],
                messaging:TYPES_MESSAGING_LEVEL[this.messagingLevel],
            }
            if(level.console <= TYPES_CONSOLE_LEVEL.INFO){
               console.info(`[${fechaLog}] [${this.consoleLevel}]: ${dataPublish.component} ${dataPublish.description}`)
            }
            if(level.messaging > TYPES_MESSAGING_LEVEL.INFO){
                return resolve(true)
             }
            this.pubsub
            .topic(this.topicName)
            .publish(dataBuffer)
            .then((messageId: string) => {
              console.log(`Message ${messageId} published.`);
              return resolve(messageId)
            })
            .catch((err: any) => {
              console.error('ERROR:', err);
              reject(err)
            });
        })
    }
    
    legal= async (document: string, version: string, url:string): Promise<any> =>{
        const dataPublish={
            type:TYPES_LEVEL.LEGAL,
            document, // TODO: validar 
            version, // TODO: validar
            origen:'api-sales-service',
            url
        }
        if(process.env.DATABASE_LEGAL){
            Object.assign(dataPublish, {
                database: process.env.DATABASE_LEGAL
            })
        }
        const dataBuffer = Buffer.from(JSON.stringify(dataPublish))
        return new Promise((resolve, reject) => {
            const level = {
                console:TYPES_CONSOLE_LEVEL[this.consoleLevel],
                messaging:TYPES_MESSAGING_LEVEL[this.messagingLevel],
            }
            if(level.messaging > TYPES_MESSAGING_LEVEL.LEGAL){
                return resolve(true)
             }
            this.pubsub
            .topic(this.topicName)
            .publish(dataBuffer)
            .then((messageId: string) => {
              console.log(`Message ${messageId} published.`);
              return resolve(messageId)
            })
            .catch((err: any) => {
              console.error('ERROR:', err);
              reject(err)
            });
        })
    }

    operational= async (request: string, response: string, url:string): Promise<any> =>{
        const dataPublish={
            type:TYPES_LEVEL.OPERATION,
            request, // TODO: validar 
            response, // TODO: validar
            origen:'api-sales-service',
            url
        }
        if(process.env.DATABASE_OPERATIONAL){
            Object.assign(dataPublish, {
                database: process.env.DATABASE_OPERATIONAL
            })
        }
        const dataBuffer = Buffer.from(JSON.stringify(dataPublish))
        return new Promise((resolve, reject) => {
            const level = {
                console:TYPES_CONSOLE_LEVEL[this.consoleLevel],
                messaging:TYPES_MESSAGING_LEVEL[this.messagingLevel],
            }
            if(level.messaging > TYPES_MESSAGING_LEVEL.OPERATION){
                return resolve(true)
             }
            this.pubsub
            .topic(this.topicName)
            .publish(dataBuffer)
            .then((messageId: string) => {
              console.log(`Message ${messageId} published.`);
              return resolve(messageId)
            })
            .catch((err: any) => {
              console.error('ERROR:', err);
              reject(err)
            });
        })
    }
}