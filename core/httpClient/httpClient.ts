
import { IHttpClient }  from './'

export abstract class HttpClient implements IHttpClient {
    public abstract get(url: string, body: any): Promise<any[]>
    public abstract put(url: string, body: any): Promise<any>    
    public abstract post(url: string, body: any): Promise<any>
    public abstract delete(url: string, filter: { key: string, operator: string, value: any }[]): Promise<boolean>      
}
