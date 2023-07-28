import { IConfig } from '../config'
import 'reflect-metadata'
import { Repository } from '../src/repository'
import { EchoEntity } from '../src/modules/echo/application/entities/echo.entity'
import { Entity } from '../src/entity'
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
describe('Repository', () => {
    const config = new MockConfig()
    const repository = new Repository(new EchoEntity(), 'echo',config)
    const reqPayloadCreate={id:'1', message:'Prueba'}
    const reqPayload2:any= {}
    
    test('Instancia de Clase', () => {
        expect(repository).toBeDefined()
    })
  /*
   *
   *  Método Index
   *
   */
  test('Index',async ()=>{
    const respRest:Entity[]=[]

    Repository.db.getAll=jest.fn().mockImplementation(() =>{
        return Promise.resolve(respRest)
    })

    // Realizar la llamada a probar
    await repository.index()
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual(respRest)
    })
    .catch(err => {
        expect(err).toBeFalsy()
    })
  })

  test('Index 500',async ()=>{
    const respRest:Entity[]=[]

    Repository.db.getAll=jest.fn().mockImplementation(() =>{
        return Promise.reject('internal_server_error')
    })

    // Realizar la llamada a probar
    await repository.index()
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
   *  Método Create
   *
   */
  test('Create',async ()=>{
    const respRest:Entity[]=[]

    Repository.db.save=jest.fn().mockImplementation((elem, table) =>{
        return Promise.resolve(respRest)
    })

    // Realizar la llamada a probar
    await repository.create(reqPayloadCreate)
    .then(result => {
        // Verificar los resultados
        expect(result).toEqual(respRest)
    })
    .catch(err => {
        expect(err).toBeFalsy()
    })
  })

  test('Create 500',async ()=>{
    const respRest:Entity[]=[]

    Repository.db.save=jest.fn().mockImplementation((elem, table) =>{
        return Promise.reject('internal_server_error')
    })

    // Realizar la llamada a probar
    await repository.create(reqPayloadCreate)
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
   *  Método Update
   *
   */
    test('Update',async ()=>{
        const respRest:Entity[]=[]
    
        Repository.db.update=jest.fn().mockImplementation((elem, table) =>{
            return Promise.resolve(respRest)
        })
    
        // Realizar la llamada a probar
        await repository.update(reqPayload2)
        .then(result => {
            // Verificar los resultados
            expect(result).toEqual(respRest)
        })
        .catch(err => {
            expect(err).toBeFalsy()
        })
      })
    
    test('Update 500',async ()=>{
        const respRest:Entity[]=[]
    
        Repository.db.update=jest.fn().mockImplementation((elem, table) =>{
            return Promise.reject('internal_server_error')
        })
    
        // Realizar la llamada a probar
        await repository.update(reqPayload2)
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
        const respRest:Entity[]=[]
        Repository.db.getMany=jest.fn().mockImplementation((elem:Entity, table) =>{
            return Promise.resolve(respRest)
        })

        // Realizar la llamada a probar
        await repository.getMany(reqPayload2)
        .then(result => {
            // Verificar los resultados
            expect(result).toEqual(respRest)
        })
        .catch(err => {
            expect(err).toBeFalsy()
        })
    })

  test('GetMany 500',async ()=>{
    const respRest:Entity[]=[]

    Repository.db.getMany=jest.fn().mockImplementation((elem, table) =>{
        return Promise.reject('internal_server_error')
    })

    // Realizar la llamada a probar
    await repository.getMany(reqPayload2)
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
   *  Método Delete
   *
   */
  test('Delete',async ()=>{
        
        Repository.db.delete=jest.fn().mockImplementation((elem, table) =>{
            return Promise.resolve(true)
        })

        // Realizar la llamada a probar
        await repository.delete(reqPayload2)
        .then(result => {
            // Verificar los resultados
            expect(result).toEqual(true)
        })
        .catch(err => {
            expect(err).toBeFalsy()
        })
    })

test('Delete 500',async ()=>{
    
    Repository.db.delete=jest.fn().mockImplementation((elem, table) =>{
        return Promise.reject('internal_server_error')
    })

    // Realizar la llamada a probar
    await repository.delete(reqPayload2)
        .then(result => {
            // Verificar los resultados
            expect(result).toEqual('internal_server_error')
        })
        .catch(err => {
            expect(err).toBeDefined()
        })
    })    
})