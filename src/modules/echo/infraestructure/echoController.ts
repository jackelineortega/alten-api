
import * as express from 'express'
import { inject } from 'inversify'
import {
    controller,
    httpGet,
    httpPost,
    interfaces,
    request,
    response
} from 'inversify-express-utils'
const Joi = require('joi')

import { EchoSchemaRequest } from '@models/schemas/echoSchema'
import { IHttpResponse } from '@models/interfaces/httpResponse'
import { EchoService } from '@modules/echo/domain/echoService'
import { TYPES } from '@config/types'

@controller('/echo')
export class EchoController implements interfaces.Controller {
    private body: any
    constructor(
        @inject(TYPES.EchoService) private echoService: EchoService
    ) {
    }

    @httpGet('/index')
    public async index (
        @request() req: express.Request,
        @response() res: express.Response,
    ): Promise<IHttpResponse> {
        this.body = req.body
        const validatorSchema = EchoSchemaRequest.EchoIndexSchemaRequest.validate(this.body)

        if (validatorSchema.error) {
            return {
                status: 422,
                errors: ['Invalid structure']
            }
        }

        try {
            return {
                status: 200,
                data:  await this.echoService.index()
            }    
        } catch (err) {
            return {
                status: 500,
                errors:  [ err ]
            }    
        }
    }

    @httpGet('/get')
    public async get(
        @request() req: express.Request,
        @response() res: express.Response
    ): Promise<IHttpResponse> {
        this.body = req.body        
        const validatorSchema = EchoSchemaRequest.EchoGetSchemaRequest.validate(this.body)
        if (validatorSchema.error) {
            return {
                status: 422,
                errors: ['Invalid structure']
            }
        }
        
        try {
            return {
                status: 200,
                data: await this.echoService.get(this.body.id)
            }    
        } catch (err) {
            return {
                status: 500,
                errors: [ err ]
            }    
        }
    }
    
    @httpPost('/getmany')
    public async getMany(
        @request() req: express.Request,
        @response() res: express.Response
    ): Promise<IHttpResponse> {
        this.body = req.body
        const validatorSchema = EchoSchemaRequest.EchoGetManySchemaRequest.validate(this.body)

        if (validatorSchema.error) {
            return {
                status: 422,
                errors: ['Invalid structure']
            }
        }
        
        try {
            return {
                status: 200,
                data: await this.echoService.getMany(this.body.filter)
            }    
        } catch (err) {
            return {
                status: 500,
                errors: [ err ]
            }    
        }
    }

    @httpPost('/show')
    public async show (
        @request() req: express.Request,
        @response() res: express.Response,
    ): Promise<IHttpResponse> {
        this.body = req.body

        const validatorSchema = EchoSchemaRequest.EchoShowSchemaRequest.validate(this.body)

        if (validatorSchema.error) {
            return {
                status: 422,
                errors: ['Invalid structure']
            }
        }
        try {
            const message = await this.echoService.show('Template for MS ' + this.body.message)
            return {
                status: 200,
                data: message
            }
        } catch {
            return {
                status: 500,
                errors: ['Server error']
            }
        }

    }

    @httpPost('/create')
    public async create (
        @request() req: express.Request,
        @response() res: express.Response,        
    ): Promise<IHttpResponse> {
        this.body = req.body

        const validatorSchema = EchoSchemaRequest.EchoCreateSchemaRequest.validate(this.body)

        if (validatorSchema.error) {
            return {
                status: 422,
                errors: ['Invalid structure']
            }
        }
        try {
            const newEcho: any = await this.echoService.create(this.body)
            return {
                status: 200,
                data: newEcho
            }
        } catch (err) {
            return {
                status: 500,
                errors: ['Server error']
            }
        }
        

    }

    @httpPost('/delete')
    public async delete (
        @request() req: express.Request,
        @response() res: express.Response,        
    ): Promise<IHttpResponse> {
        this.body = req.body

        const validatorSchema = EchoSchemaRequest.EchoDeleteSchemaRequest.validate(this.body)

        if (validatorSchema.error) {
            return {
                status: 422,
                errors: ['Invalid structure']
            }
        }
        try {
            const deleted: boolean = await this.echoService.delete(this.body)
            return {
                status: 200,
                data: deleted
            }
        } catch {
            return {
                status: 500,
                errors: ['Server error']
            }
        }   
    }    

    @httpPost('/update')
    public async update (
        @request() req: express.Request,
        @response() res: express.Response,        
    ): Promise<IHttpResponse> {
        this.body = req.body

        const validatorSchema = EchoSchemaRequest.EchoUpdateSchemaRequest.validate(this.body)

        if (validatorSchema.error) {
            return {
                status: 422,
                errors: ['Invalid structure']
            }
        }
        try {
            const updatedEcho: any = await this.echoService.update(this.body)
            return {
                status: 200,
                data: updatedEcho
            }
        } catch (err) {
            return {
                status: 500,
                errors: ['Server error']
            }
        }
    }

}
