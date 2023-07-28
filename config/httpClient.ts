import { HttpClient1 } from "../core/httpClient/http1/http1"
import { TYPES_HTTPCLIENT } from "./types.enum"

const getHttpClient = () => {
    switch(process.env.HTTPCLIENT) {
        case TYPES_HTTPCLIENT.AXIOS:
            return HttpClient1.getInstance()
        
        case TYPES_HTTPCLIENT.HTTPREQUEST:
            return HttpClient1.getInstance()
        default:
            return HttpClient1.getInstance()
    }    
}


export const HTTPCLIENT = getHttpClient()