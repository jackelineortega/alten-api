import { IReadingFileRequest } from "@models/interfaces/readingService";

export interface IReadingService {
    process_reading(payload:IReadingFileRequest):Promise<any>
}
