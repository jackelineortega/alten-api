import { PubSubLogger } from "../core/messaging/pubsub/pubsub"
import { TYPES_C_LEVEL, TYPES_LEVEL, TYPES_MESSAGING } from "./types.enum"

const getMessaging = () => {
    switch(process.env.MESSAGING) {
        case TYPES_MESSAGING.PUBSUB:
            return PubSubLogger.getInstance({topic:process.env.MESSAGING_TOPIC,consoleLevel:getConsoleLevel(), messagingLevel:getMessagingLevel()})
        
        case TYPES_MESSAGING.NATS:
            return PubSubLogger.getInstance({topic:process.env.MESSAGING_TOPIC,consoleLevel:getConsoleLevel(), messagingLevel:getMessagingLevel()})
    
        default:
            return PubSubLogger.getInstance({topic:process.env.MESSAGING_TOPIC,consoleLevel:getConsoleLevel(), messagingLevel:getMessagingLevel()})
    }    
}
const getConsoleLevel=():TYPES_C_LEVEL =>{
    switch(process.env.CONSOLE_LEVEL){
        case TYPES_C_LEVEL.DEBUG:
            return TYPES_C_LEVEL.DEBUG
        case TYPES_C_LEVEL.ERROR:
            return TYPES_C_LEVEL.ERROR
        case TYPES_C_LEVEL.INFO:
            return TYPES_C_LEVEL.INFO 
        default: 
            return TYPES_C_LEVEL.DEBUG
    }
}

const getMessagingLevel=():TYPES_LEVEL =>{
    switch(process.env.MESSAGING_LEVEL){
        case TYPES_LEVEL.DEBUG:
            return TYPES_LEVEL.DEBUG
        case TYPES_LEVEL.ERROR:
            return TYPES_LEVEL.ERROR
        case TYPES_LEVEL.INFO:
            return TYPES_LEVEL.INFO   
        case TYPES_LEVEL.LEGAL:
            return TYPES_LEVEL.LEGAL   
        case TYPES_LEVEL.OPERATION:
            return TYPES_LEVEL.OPERATION                                    
        default: 
            return TYPES_LEVEL.OPERATION
    }
}

export const MESSAGING = getMessaging()

export const CONSOLE_LEVEL = getConsoleLevel()

export const MESSAGING_LEVEL = getMessagingLevel()