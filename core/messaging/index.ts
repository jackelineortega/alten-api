export interface IMessaging {
    debug(data: string): Promise<any>
    error(data: string, typeError:string): Promise<any>
    info(component:string, description:string): Promise<any>
    legal(document: string, version: string, url:string): Promise<any>
    operational(request: string, response: string, url:string): Promise<any>
}