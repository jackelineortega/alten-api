import 'reflect-metadata'
import { BaseService } from '../src/baseService'
import { IConfig } from '../config/index'
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
describe('BaseService', () => {
    const config = new MockConfig()
    const repo = new Repository(new EchoEntity(), 'echo',config)
    const baseService:IBaseService = new BaseService(repo)
    test('Instancia de Clase', () => {
        expect(baseService).toBeDefined()
    })
   
  /*
   *
   *  Método Index
   *
   */
  test('Index',async ()=>{
    const respRest:any[]=[{id:'1',message:'Prueba'}]

    baseService.repository.index=jest.fn().mockImplementation(() =>{
        return Promise.resolve(respRest)
    })

    // Realizar la llamada a probar
    await baseService.index()
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual(respRest)
    })
    .catch(err => {
        expect(err).toBeFalsy()
    })
  })

  test('Index 500',async ()=>{
    const respRest:any[]=[{id:'1',message:'Prueba'}]

    baseService.repository.index=jest.fn().mockImplementation(() =>{
        return Promise.reject('internal_server_error')
    })

    // Realizar la llamada a probar
    await baseService.index()
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual('internal_server_error')
    })
    .catch(err => {
        expect(err).toBeDefined()
    })
  })  
  /*
   *
   *  Método Get
   *
   */
  test('Get',async ()=>{
    const respRest:any[]=[{id:'1',message:'Prueba'}]

    baseService.repository.get=jest.fn().mockImplementation((id:number) =>{
        return Promise.resolve(respRest)
    })

    // Realizar la llamada a probar
    await baseService.get()
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual(respRest)
    })
    .catch(err => {
        expect(err).toBeFalsy()
    })
  })

  test('Get 500',async ()=>{
    const respRest:any[]=[{id:'1',message:'Prueba'}]

    baseService.repository.get=jest.fn().mockImplementation((id:number) =>{
        return Promise.reject('internal_server_error')
    })

    // Realizar la llamada a probar
    await baseService.get()
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual('internal_server_error')
    })
    .catch(err => {
        expect(err).toBeDefined()
    })
  })
  /*
   *
   *  Método GetMany
   *
   */
  test('GetMany',async ()=>{
    const respRest:any[]=[{id:'1',message:'Prueba'}]

    baseService.repository.getMany=jest.fn().mockImplementation((elem:EchoEntity) =>{
        return Promise.resolve(respRest)
    })

    // Realizar la llamada a probar
    await baseService.getMany()
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual(respRest)
    })
    .catch(err => {
        expect(err).toBeFalsy()
    })
  })

  test('GetMany 500',async ()=>{
    const respRest:any[]=[{id:'1',message:'Prueba'}]

    baseService.repository.getMany=jest.fn().mockImplementation((elem:EchoEntity) =>{
        return Promise.reject('internal_server_error')
    })

    // Realizar la llamada a probar
    await baseService.getMany()
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual('internal_server_error')
    })
    .catch(err => {
        expect(err).toBeDefined()
    })
  })

  /*
   *
   *  Método create
   *
   */
  test('Create',async ()=>{
    const respRest:any[]=[{id:'1',message:'Prueba'}]

    baseService.repository.create=jest.fn().mockImplementation((elem:EchoEntity) =>{
        return Promise.resolve(respRest)
    })

    // Realizar la llamada a probar
    await baseService.create()
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual(respRest)
    })
    .catch(err => {
        expect(err).toBeFalsy()
    })
  })  

  test('Create 500',async ()=>{
    const respRest:any[]=[{id:'1',message:'Prueba'}]

    baseService.repository.create=jest.fn().mockImplementation((elem:EchoEntity) =>{
        return Promise.reject('internal_server_error')
    })

    // Realizar la llamada a probar
    await baseService.create()
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual('internal_server_error')
    })
    .catch(err => {
        expect(err).toBeDefined()
    })
  }) 
  /*
   *
   *  Método update
   *
   */
  test('Update',async ()=>{
    const respRest:any[]=[{id:'1',message:'Prueba'}]

    baseService.repository.update=jest.fn().mockImplementation((elem:EchoEntity) =>{
        return Promise.resolve(respRest)
    })

    // Realizar la llamada a probar
    await baseService.update()
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual(respRest)
    })
    .catch(err => {
        expect(err).toBeFalsy()
    })
  }) 
  
  test('Update 500',async ()=>{
    const respRest:any[]=[{id:'1',message:'Prueba'}]

    baseService.repository.update=jest.fn().mockImplementation((elem:EchoEntity) =>{
        return Promise.reject('internal_server_error')
    })

    // Realizar la llamada a probar
    await baseService.update()
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual('internal_server_error')
    })
    .catch(err => {
        expect(err).toBeDefined()
    })
  })  
  /*
   *
   *  Método delete
   *
   */
  test('Delete',async ()=>{
    const respRest:any[]=[{id:'1',message:'Prueba'}]

    baseService.repository.delete=jest.fn().mockImplementation((elem:EchoEntity) =>{
        return Promise.resolve(respRest)
    })

    // Realizar la llamada a probar
    await baseService.delete()
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual(respRest)
    })
    .catch(err => {
        expect(err).toBeFalsy()
    })
  })  

  test('Delete 500',async ()=>{
    const respRest:any[]=[{id:'1',message:'Prueba'}]

    baseService.repository.delete=jest.fn().mockImplementation((elem:EchoEntity) =>{
        return Promise.reject('internal_server_error')
    })

    // Realizar la llamada a probar
    await baseService.delete()
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual('internal_server_error')
    })
    .catch(err => {
        expect(err).toBeDefined()
    })
  })  

})