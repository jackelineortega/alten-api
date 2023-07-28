import 'reflect-metadata'
import { createRequest, createResponse } from 'node-mocks-http'

import { IConfig } from '../config/index'
import { BaseService } from '../src/baseService'
import { BaseController } from '../src/baseController'
import { Repository } from '../src/repository'
import { EchoEntity } from '../src/modules/echo/application/entities/echo.entity'
import { IBaseService } from '../src/models/interfaces/baseService'
import { TYPES_C_LEVEL, TYPES_LEVEL } from '../config/types.enum'

const db:any={}
const cors:any={}
const xml:any={}
const mss:any={}
const httpC:any={}
// Crear mock Config
const mockConfigData = {
  cors,
  database: db,
  messaging:mss,
  xmlConvert: xml,
  consoleLevel:TYPES_C_LEVEL.DEBUG,
  messagingLevel:TYPES_LEVEL.DEBUG,
  topic:'prueba',
  httpClient:httpC
}
class MockConfig implements IConfig {
  public get = () => {
    return mockConfigData
  }

}


describe ('BaseController', ()=>{
    const config = new MockConfig()
    const repo = new Repository(new EchoEntity(), 'echo',config)
    const baseService:IBaseService = new BaseService(repo)
    const baseController = new BaseController(baseService)
    const reqPayload = {}
    const reqPayload2 = {
      message:'Prueba'
    }
    const reqPayload3 = {
      id:'1'
    }
    const reqPayload4 = {
      filter:[]
    }
    const reqPayload5 = {
      id:'1',
      message:'Prueba'
    }
  /*
   *
   *  Método Index
   *
   */
    test('GET Index, con body valido', async () => {
        const arr:any[]=[]
        const rServicio= baseService.index = jest.fn().mockImplementation(() =>{
            return Promise.resolve(arr)
        })
        const body = reqPayload

        const req = createRequest({
          body,
          method: 'GET',
          url: `/echo/index`,
        })
    
        const res = createResponse()
        const next = () => {
            const a = 1
          }
            
        const resp = await baseController.index(req, res,next)
    
        expect(resp.status).toEqual(200)
        expect(resp.data).toBeDefined()
    })
  test('GET Index, con body valido, error en servicio retorna 500', async () => {

   const rServicio= baseService.index = jest.fn().mockImplementation(() =>{
        return Promise.reject('internal_server_error')
    })
    const body = reqPayload

    const req = createRequest({
      body,
      method: 'GET',
      url: `/echo/index`,
    })

    const res = createResponse()
    const next = () => {
        const a = 1
      }        
    const resp = await baseController.index(req, res,next)

    expect(resp.status).toEqual(500)  
  })
})


