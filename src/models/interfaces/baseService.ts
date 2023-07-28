
import { Repository } from "../../repository";
import { Entity } from "../../entity"

export interface IBaseService {
    index (): Promise<Entity[]>
    create (): Promise<Entity|Object> 
    get (): Promise<Entity|Object>
    getMany (): Promise<Entity|Object>
    update (): Promise<Entity|Object>
    delete (): Promise<Boolean>
    repository: Repository
}
