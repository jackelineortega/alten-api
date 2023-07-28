
export interface IDataBase {
    get(filters: any, table: string): Promise<any>
    getAll(table: string, limit?: number, sort?: any): Promise<any[]>
    getMany(elem: any, table: string, options:any): Promise<any[]>
    save(elem: any, table: string): Promise<any>
    delete(elem: any, table: string): Promise<boolean>
    update(elem: any, table: string): Promise<any>   
    isConnected?():Promise<boolean>
}


