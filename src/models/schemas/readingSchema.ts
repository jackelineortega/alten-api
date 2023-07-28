
import joi from 'joi'


const ReadingFileSchemaRequest = joi.object().keys({
    file: joi.string().required()
}).required()

const SalesGetDailySchemaRequest = joi.object().keys({
    startDate: joi.string().required(),
    endDate: joi.string().required()
}).required()

const SalesSaveSchemaRequest = joi.object().keys({
    sku: joi.alternatives().try(joi.number(), joi.string()).required(),
    offerId: joi.number().required(),
    quantity: joi.number().required(),
    salesDate: joi.string().required()
}).required()

export const ReadingSchemaRequest = {
    ReadingFileSchemaRequest
}


