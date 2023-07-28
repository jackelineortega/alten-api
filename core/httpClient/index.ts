
export interface IHttpClient {
    get(url: string, body: any): Promise<any>;
    put(url: string, body: any): Promise<any>;    
    post(url: string, body: any): Promise<any>;
    delete(url: string, filter: { key: string, operator: string, value: any }[]): Promise<boolean>;    
}
