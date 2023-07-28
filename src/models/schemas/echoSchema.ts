
import joi from 'joi'

const EchoShowSchemaRequest = joi.object().keys({
    message: joi.string().required()
}).required()

const EchoIndexSchemaRequest = joi.object().keys({
}).required()

const EchoCreateSchemaRequest = joi.object().keys({
    id: joi.number().optional(),
    message: joi.string().required()
}).required()

const EchoUpdateSchemaRequest = joi.object().keys({
    id: joi.alternatives().try(joi.number(), joi.string()).required(),
    message: joi.string().required()
}).required()

const EchoGetSchemaRequest = joi.object().keys({
    id: joi.alternatives().try(joi.number(), joi.string()).required()
}).required()

const EchoGetManySchemaRequest = joi.object().keys({
    filter: joi.alternatives().try(joi.object(), joi.array()).required()
}).required()

const EchoDeleteSchemaRequest = joi.object().keys({
    id: joi.alternatives().try(joi.number(), joi.string()).required()
}).required()

export const EchoSchemaRequest = {
    EchoCreateSchemaRequest,
    EchoDeleteSchemaRequest,
    EchoGetSchemaRequest,
    EchoGetManySchemaRequest,
    EchoIndexSchemaRequest,
    EchoShowSchemaRequest,
    EchoUpdateSchemaRequest,
}


