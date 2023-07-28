
import { Entity } from "@base/entity"

const PROPERTIES = [
    {
        name: 'id',
        type: 'string'
    },
    {
        name: 'message',
        type: 'string'
    }
]
export class ReadingEntity extends Entity {
    constructor() {
        super(PROPERTIES)
    }
}
