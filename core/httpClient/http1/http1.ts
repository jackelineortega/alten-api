
import axios from 'axios'
import { IHttpClient } from '../'

export class HttpClient1 implements IHttpClient {
    private static instance: HttpClient1
    private static flag: boolean
    // TODO: implementar header, encriptación 
    constructor() {

    }
    public static getInstance = () => {
        if (!HttpClient1.flag) {
            HttpClient1.flag = true
            HttpClient1.instance = new HttpClient1()
        }
        return HttpClient1.instance
    }
    get(url: string, body: any): Promise<any[]> {
        try {
            return axios.get(url, body)
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }
    put(url: string, body: any): Promise<any> {
        try {
            return axios.put(url, body)
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }
    post(url: string, body: any): Promise<any> {
        try {
            return axios.post(url, body)
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }
    delete(url: string, filter: { key: string; operator: string; value: any }[]): Promise<boolean> {
        try {
            return axios.delete(url, {})
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }
}
