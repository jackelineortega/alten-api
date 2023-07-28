
import { TYPES } from '../config/types'
import * as express from 'express'
import { inject } from 'inversify'
import {
    controller,
    httpPost,
    interfaces,
    next,
    request,
    response
} from 'inversify-express-utils'
import { IBaseService } from './models/interfaces/baseService'
const Joi = require('joi')

import { IHttpResponse } from './models/interfaces/httpResponse'

@controller('/echo')
export class BaseController implements interfaces.Controller {
    protected body: any
    private baseService: IBaseService
    constructor(
        baseService: IBaseService
    ) {
        this.baseService = baseService
    }

    @httpPost('/index')
    public async index (
        @request() req: express.Request,
        @response() res: express.Response,
        @next() nextFunction: express.NextFunction
    ): Promise<IHttpResponse> {
        this.body = req.body

        try {
            const list = await this.baseService.index()
            const response: IHttpResponse = {
                status: 200,
                data: list
            }
            return response
        } catch {
            return {
                status: 500,
                errors: ['Server error']
            }
        }
    }

}
