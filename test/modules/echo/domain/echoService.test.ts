import 'reflect-metadata'
import { EchoEntity } from '../../../../src/modules/echo/application/entities/echo.entity'
import { IConfig } from '../../../../config/index'
import { EchoService } from '../../../../src/modules/echo/domain/echoService'
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
describe('EchoService', () => {
    const config = new MockConfig()
    const echoService = new EchoService(config)
    const reqPayload = {}
    const reqPayload2 = {
      message:'Prueba'
    }
    const reqPayload3 = {
      id:1
    }
    const reqPayload4 = {
      filter:[]
    }
    const reqPayload5 = {
      id:'1',
      message:'Prueba'
    }

    const reqPayloadE = new EchoEntity()
    test('Instancia de Clase', () => {
        expect(echoService).toBeDefined()
    })

  /*
   *
   *  Método Show
   *
   */
  test('Show',async ()=>{
      const respRest='This is the template service '+ reqPayload2.message

    // Realizar la llamada a probar
    await echoService.show(reqPayload2.message)
    .then(result => {
      // Verificar los resultados
      expect(result).toEqual(respRest)
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
  })

  /*
   *
   *  Método Index
   *
   */
  test('Index',async ()=>{
    const respRest:any[]=[{id:'1',message:'Prueba'}]

    echoService.repo.index=jest.fn().mockImplementation(() =>{
        return Promise.resolve(respRest)
    })

    // Realizar la llamada a probar
    await echoService.index()
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual(respRest)
    })
    .catch(err => {
        expect(err).toBeFalsy()
    })
  })

  /*
   *
   *  Método Get
   *
   */
  test('Get',async ()=>{
    const respRest:any[]=[{id:'1',message:'Prueba'}]

    echoService.repo.get=jest.fn().mockImplementation((id:number) =>{
        return Promise.resolve(respRest)
    })

    // Realizar la llamada a probar
    await echoService.get(reqPayload3.id)
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual(respRest)
    })
    .catch(err => {
        expect(err).toBeFalsy()
    })
  })
  /*
   *
   *  Método GetMany
   *
   */
  test('GetMany',async ()=>{
    const respRest:any[]=[{id:'1',message:'Prueba'}]

    echoService.repo.getMany=jest.fn().mockImplementation((elem:EchoEntity) =>{
        return Promise.resolve(respRest)
    })

    // Realizar la llamada a probar
    await echoService.getMany(reqPayloadE)
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual(respRest)
    })
    .catch(err => {
        expect(err).toBeFalsy()
    })
  })

  /*
   *
   *  Método create
   *
   */
  test('Create',async ()=>{
    const respRest:any[]=[{id:'1',message:'Prueba'}]

    echoService.repo.create=jest.fn().mockImplementation((elem:EchoEntity) =>{
        return Promise.resolve(respRest)
    })

    // Realizar la llamada a probar
    await echoService.create(reqPayloadE)
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual(respRest)
    })
    .catch(err => {
        expect(err).toBeFalsy()
    })
  })  

  /*
   *
   *  Método update
   *
   */
  test('Update',async ()=>{
    const respRest:any[]=[{id:'1',message:'Prueba'}]

    echoService.repo.update=jest.fn().mockImplementation((elem:EchoEntity) =>{
        return Promise.resolve(respRest)
    })

    // Realizar la llamada a probar
    await echoService.update(reqPayloadE)
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual(respRest)
    })
    .catch(err => {
        expect(err).toBeFalsy()
    })
  }) 
  
  /*
   *
   *  Método delete
   *
   */
  test('Delete',async ()=>{
    const respRest:any[]=[{id:'1',message:'Prueba'}]

    echoService.repo.delete=jest.fn().mockImplementation((elem:EchoEntity) =>{
        return Promise.resolve(respRest)
    })

    // Realizar la llamada a probar
    await echoService.delete(reqPayloadE)
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual(respRest)
    })
    .catch(err => {
        expect(err).toBeFalsy()
    })
  })  
})