import 'reflect-metadata'
import * as cors from './cors'
import { DATABASE } from './database'
import {CONSOLE_LEVEL, MESSAGING, MESSAGING_LEVEL} from './messaging'
import { HTTPCLIENT } from './httpClient'
import { TYPES_C_LEVEL, TYPES_LEVEL } from './types.enum'

export interface IConfig {
    get(): { cors: any, database: any, messaging:any, topic:any, consoleLevel:TYPES_C_LEVEL,messagingLevel:TYPES_LEVEL, httpClient:any }
}

export class Config implements IConfig {
    get = () => {
        return {
            cors,
            database: DATABASE,
            messaging: MESSAGING,
            topic:process.env.MESSAGING_TOPIC?process.env.MESSAGING_TOPIC:'',
            consoleLevel: CONSOLE_LEVEL,
            messagingLevel: MESSAGING_LEVEL,
            httpClient: HTTPCLIENT
        }
    }
}