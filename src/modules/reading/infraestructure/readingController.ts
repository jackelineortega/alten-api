
import * as express from 'express'
import { inject } from 'inversify'
import {
    controller,
    httpGet,
    httpPost,
    interfaces,
    request,
    response,
    next
} from 'inversify-express-utils'
const Joi = require('joi')

import { ReadingSchemaRequest } from '@models/schemas/readingSchema'
import { ReadingService } from '@modules/reading/domain/readingService'
import { TYPES } from '@config/types'

@controller('/reading')
export class ReadingController implements interfaces.Controller {
    private body: any
    constructor(
        @inject(TYPES.ReadingService) private readingService: ReadingService
    ) {
    }

    @httpPost('/file')
    public async _processFile(
        @request() req: express.Request,
        @response() res: express.Response,
        @next() nextFunction: express.NextFunction
    ): Promise<any> {
        this.body = req.body        
        const validatorSchema = ReadingSchemaRequest.ReadingFileSchemaRequest.validate(this.body)
        if (validatorSchema.error) {
            res.status(422).json({ errors: ['invalid_request'] })
            nextFunction()
            return
        }
        
        try {
            const result = await this.readingService.process_reading(this.body)
            const httpResponse = {
                data: result,
              }
              res.status(200).json(httpResponse)
              nextFunction()
              return
  
        } catch (err) {
            res.status(500).json({ errors: ['internal_server_error'] })
            nextFunction()
            return
        }
    }
}
