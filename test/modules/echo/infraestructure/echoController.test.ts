import 'reflect-metadata'
import { EchoController } from '../../../../src/modules/echo/infraestructure/echoController'
import { EchoService } from '../../../../src/modules/echo/domain/echoService'
import { createRequest, createResponse } from 'node-mocks-http'
import { Entity } from '../../../../src/entity'
import { IConfig } from '../../../../config/index'
import { EchoEntity } from '../../../../src/modules/echo/application/entities/echo.entity'
import { TYPES_C_LEVEL, TYPES_LEVEL } from '../../../../config/types.enum'

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


describe ('EchoController', ()=>{
    const config = new MockConfig()
    const echoService = new EchoService(config)
    const echoController = new EchoController(echoService)
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
        const rServicio= echoService.index = jest.fn().mockImplementation(() =>{
            return Promise.resolve(arr)
        })
        const body = reqPayload

        const req = createRequest({
          body,
          method: 'GET',
          url: `/echo/index`,
        })
    
        const res = createResponse()
            
        const resp = await echoController.index(req, res)
    
        expect(resp.status).toEqual(200)
        expect(resp.data).toBeDefined()
    })
    test('GET Index, con body invalido, retorna 422', async () => {
     const rServicio= echoService.index = jest.fn().mockImplementation(() =>{
          return Promise.resolve()
      })
      const body = reqPayload2

      const req = createRequest({
        body,
        method: 'GET',
        url: `/echo/index`,
      })
  
      const res = createResponse()
          
      const resp = await echoController.index(req, res)

      expect(resp.status).toEqual(422)
  })
 
  test('GET Index, con body valido, error en servicio retorna 500', async () => {

   const rServicio= echoService.index = jest.fn().mockImplementation(() =>{
        return Promise.reject('internal_server_error')
    })
    const body = reqPayload

    const req = createRequest({
      body,
      method: 'GET',
      url: `/echo/index`,
    })

    const res = createResponse()
        
    const resp = await echoController.index(req, res)

    expect(resp.status).toEqual(500)  
  })
  /*
   *
   *  Método Get
   *
   */
  test('GET get, con body valido', async () => {
        
    const id=1

   const rServicio= echoService.get = jest.fn().mockImplementation(() =>{
        return Promise.resolve(id)
    })
    const body = reqPayload3

    const req = createRequest({
      body,
      method: 'GET',
      url: `/echo/get`,
    })

    const res = createResponse()
        
    const resp = await echoController.get(req, res)

    expect(resp.status).toEqual(200)
    expect(resp.data).toBeDefined()
  })
  test('GET get, con body invalido, retorna 422', async () => {
      
    const id=1

  const rServicio= echoService.get = jest.fn().mockImplementation(() =>{
        return Promise.resolve(id)
    })
    const body = reqPayload2

    const req = createRequest({
      body,
      method: 'GET',
      url: `/echo/get`,
    })

    const res = createResponse()
        
    const resp = await echoController.get(req, res)

    expect(resp.status).toEqual(422)
  })

  test('GET get, con body valido, error en servicio retorna 500', async () => {
        
    const rServicio= echoService.get = jest.fn().mockImplementation(() =>{
        return Promise.reject('internal_server_error')
    })
    const body = reqPayload3

    const req = createRequest({
      body,
      method: 'GET',
      url: `/echo/get`,
    })

    const res = createResponse()
        
    const resp = await echoController.get(req, res)

    expect(resp.status).toEqual(500)  
  })
  /*
   *
   *  Método GetMany
   *
   */
  test('POST getmany, con body valido', async () => {
        
    const arr:any[]=[{id:'algo', message:'prueba'}]

   const rServicio= echoService.getMany = jest.fn().mockImplementation(() =>{
        return Promise.resolve(arr)
    })
    const body = reqPayload4

    const req = createRequest({
      body,
      method: 'POST',
      url: `/echo/getMany`,
    })

    const res = createResponse()
        
    const resp = await echoController.getMany(req, res)
    
    expect(resp.status).toEqual(200)
    expect(resp.data).toBeDefined()
  })
  test('POST getmany, con body invalido, retorna 422', async () => {
      
    const arr:any[]=[]

    const rServicio= echoService.getMany = jest.fn().mockImplementation(() =>{
          return Promise.resolve(arr)
      })
      const body = reqPayload2

      const req = createRequest({
        body,
        method: 'POST',
        url: `/echo/getMany`,
      })

      const res = createResponse()
          
      const resp = await echoController.getMany(req, res)

      expect(resp.status).toEqual(422)
    })

  test('POST getmany, con body valido, error en servicio retorna 500', async () => {
      
  const arr:any[]=[]

  const rServicio= echoService.getMany = jest.fn().mockImplementation(() =>{
      return Promise.reject('internal_server_error')
  })
  const body = reqPayload4

  const req = createRequest({
    body,
    method: 'POST',
    url: `/echo/getMany`,
  })

  const res = createResponse()
      
  const resp = await echoController.getMany(req, res)

  expect(resp.status).toEqual(500)  
  })

  /*
   *
   *  Método Show
   *
   */
  test('POST show, con body valido', async () => {
        
    const rServicio= echoService.show = jest.fn().mockImplementation((message:string) =>{
        return Promise.resolve('This is the template service'+ message)
    })
    const body = reqPayload2

    const req = createRequest({
      body,
      method: 'POST',
      url: `/echo/show`,
    })

    const res = createResponse()
        
    const resp = await echoController.show(req, res)
    
    expect(resp.status).toEqual(200)
    expect(resp.data).toBeDefined()
  })
  test('POST show, con body invalido, retorna 422', async () => {
      
    const rServicio= echoService.show = jest.fn().mockImplementation((message:string) =>{
      return Promise.resolve('This is the template service'+ message)
     })
      const body = reqPayload

      const req = createRequest({
        body,
        method: 'POST',
        url: `/echo/show`,
      })

      const res = createResponse()
          
      const resp = await echoController.show(req, res)

      expect(resp.status).toEqual(422)
    })

  test('POST show, con body valido, error en servicio retorna 500', async () => {
      
    const rServicio= echoService.show = jest.fn().mockImplementation(() =>{
        return Promise.reject('internal_server_error')
    })
    const body = reqPayload2

    const req = createRequest({
      body,
      method: 'POST',
      url: `/echo/show`,
    })

    const res = createResponse()
        
    const resp = await echoController.show(req, res)

    expect(resp.status).toEqual(500)  
  })

  /*
   *
   *  Método create
   *
   */
  test('POST create, con body valido', async () => {

    const arr:any[]=[{id:'1',message:'Prueba'}]    
    const rServicio= echoService.create = jest.fn().mockImplementation(() =>{
        return Promise.resolve(arr)
    })
    const body = reqPayload5

    const req = createRequest({
      body,
      method: 'POST',
      url: `/echo/create`,
    })

    const res = createResponse()
        
    const resp = await echoController.create(req, res)
    
    expect(resp.status).toEqual(200)
    expect(resp.data).toBeDefined()
  })
  test('POST create, con body invalido, retorna 422', async () => {
      
    const arr:any[]=[{id:'1',message:'Prueba'}]    
    const rServicio= echoService.create = jest.fn().mockImplementation(() =>{
        return Promise.resolve(arr)
    })
      const body = reqPayload

      const req = createRequest({
        body,
        method: 'POST',
        url: `/echo/create`,
      })

      const res = createResponse()
          
      const resp = await echoController.create(req, res)

      expect(resp.status).toEqual(422)
    })

  test('POST create, con body valido, error en servicio retorna 500', async () => {
      
    const rServicio= echoService.create = jest.fn().mockImplementation(() =>{
        return Promise.reject('internal_server_error')
    })
    const body = reqPayload5

    const req = createRequest({
      body,
      method: 'POST',
      url: `/echo/create`,
    })

    const res = createResponse()
        
    const resp = await echoController.create(req, res)

    expect(resp.status).toEqual(500)  
  })

  /*
   *
   *  Método delete
   *
   */
    test('POST delete, con body valido', async () => {

      const arr:any[]=[{id:'1',message:'Prueba'}]    
      const rServicio= echoService.delete = jest.fn().mockImplementation(() =>{
          return Promise.resolve(arr)
      })
      const body = reqPayload3
  
      const req = createRequest({
        body,
        method: 'POST',
        url: `/echo/delete`,
      })
  
      const res = createResponse()
          
      const resp = await echoController.delete(req, res)
      
      expect(resp.status).toEqual(200)
      expect(resp.data).toBeDefined()
    })
    test('POST delete, con body invalido, retorna 422', async () => {
        
      const arr:any[]=[{id:'1',message:'Prueba'}]    
      const rServicio= echoService.delete = jest.fn().mockImplementation(() =>{
          return Promise.resolve(arr)
      })
        const body = reqPayload
  
        const req = createRequest({
          body,
          method: 'POST',
          url: `/echo/delete`,
        })
  
        const res = createResponse()
            
        const resp = await echoController.delete(req, res)
  
        expect(resp.status).toEqual(422)
      })
  
    test('POST delete, con body valido, error en servicio retorna 500', async () => {
        
      const rServicio= echoService.delete = jest.fn().mockImplementation(() =>{
          return Promise.reject('internal_server_error')
      })
      const body = reqPayload3
  
      const req = createRequest({
        body,
        method: 'POST',
        url: `/echo/delete`,
      })
  
      const res = createResponse()
          
      const resp = await echoController.delete(req, res)
  
      expect(resp.status).toEqual(500)  
    })

  /*
   *
   *  Método update
   *
   */
    test('POST update, con body valido', async () => {

      const arr:any[]=[{id:'1',message:'Prueba'}]    
      const rServicio= echoService.update = jest.fn().mockImplementation(() =>{
          return Promise.resolve(arr)
      })
      const body = reqPayload5

      const req = createRequest({
        body,
        method: 'POST',
        url: `/echo/update`,
      })

      const res = createResponse()
          
      const resp = await echoController.update(req, res)
      
      expect(resp.status).toEqual(200)
      expect(resp.data).toBeDefined()
    })
    test('POST update, con body invalido, retorna 422', async () => {
        
      const arr:any[]=[{id:'1',message:'Prueba'}]    
      const rServicio= echoService.update = jest.fn().mockImplementation(() =>{
          return Promise.resolve(arr)
      })
        const body = reqPayload

        const req = createRequest({
          body,
          method: 'POST',
          url: `/echo/update`,
        })

        const res = createResponse()
            
        const resp = await echoController.update(req, res)

        expect(resp.status).toEqual(422)
      })

    test('POST update, con body valido, error en servicio retorna 500', async () => {
        
      const rServicio= echoService.update = jest.fn().mockImplementation(() =>{
          return Promise.reject('internal_server_error')
      })
      const body = reqPayload5

      const req = createRequest({
        body,
        method: 'POST',
        url: `/echo/update`,
      })

      const res = createResponse()
          
      const resp = await echoController.update(req, res)

      expect(resp.status).toEqual(500)  
    })
  
})


