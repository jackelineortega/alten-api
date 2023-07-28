import { ObjectId } from 'mongodb'
/*
elem            : elemento de entrada
table           : tabla en sql
strSql          : construcción string de la query
apostropheWrap  : si el elemento de entrada debe o no ser envuelto en apóstrofos
*/
export const sqlQueryBuilder = (elem:any, table:string|null, strSql?:string, apostropheWrap?:boolean) => {
    let finalStr = !strSql ? ';' : ''

    strSql = table && !strSql ? `SELECT * FROM ${table} WHERE ` : strSql

    if (isObject(elem)) {   // es un operador lógico que gobierna un grupo de condiciones
        Object.keys(elem).forEach(logicalOp => {
            const [start, end] = logicalOp == 'or' || logicalOp == 'and' ? ['(', ') '] : ['', '']

            strSql += start

            if (isArray(elem[logicalOp])) { //es el grupo de condiciones gobernadas por el operador
                elem[logicalOp].forEach((el:any, i:number) => {
                    strSql = sqlQueryBuilder(el, null, strSql)
                    strSql += i + 1 < elem[logicalOp].length ? `${logicalOp.toUpperCase()} ` : ''
                })
            }

            strSql += end
        })
    }
    else if (isArray(elem)) {
        elem.forEach((subElem:any, i:number) => {
            if (isArray(subElem) || isObject(subElem))  // es una condición o un operador lógico
                strSql = sqlQueryBuilder(subElem, null, strSql)
            
            else if (isString(subElem) || isNumber(subElem)) {  // es un campo, operador o valor
                const useApostrophe:boolean = i == 2 && String(subElem).indexOf('(') < 0
                
                strSql = sqlQueryBuilder(subElem, null, strSql, useApostrophe)
            }
        })
    } else
        strSql +=  (apostropheWrap ? `'` : '') + elem + (apostropheWrap ? `'` : '') + ' '

    strSql += finalStr

    return strSql
}

export const mongoQueryBuilder = (elem:Object|Array<any>):object => {
    let queryObj = elem
    
    if (isObject(elem)) {   // es un operador lógico que gobierna un grupo de condiciones
        queryObj = mongoInputObjectBuilder(elem)
    }
    else if (isArray(elem)) {   // es un grupo de condiciones o una condición
        queryObj = mongoInputArrayBuilder(elem)
    }

    return queryObj
}

export const mongoInputObjectBuilder = (obj:any = {}):Object => {
    let auxObj:any = {}

    Object.keys(obj).forEach(logicalOp => {
        const modifiedOp = `$${logicalOp}`
        auxObj[modifiedOp] = obj[logicalOp]

        auxObj[modifiedOp] = auxObj[modifiedOp].map((element:Object|Array<any>) => {
            if (isObject(element)) {
                return mongoInputObjectBuilder(element)
            }
            else if (isArray(element)) {
                return mongoInputArrayBuilder(element)
            }
        })
    })

    return auxObj
}

export const mongoInputArrayBuilder = (arr:any):Object => {
    let auxObj:any = {}
    let isId = false

    if (isString(arr[0])) {
        let newCondition:any = {}

        if (arr[0] == 'id') {
            arr[0] = '_id'
            isId = true
        }

        newCondition[arr[0]] = {}
        newCondition[arr[0]][`${toMongoOperator(arr[1])}`] = toMongoValue(arr[2], isId)
        auxObj = newCondition
    }
    else {
        arr.forEach((element:Object|Array<any>) => {
            if (isObject(element)) {
                auxObj = mongoInputObjectBuilder(element)
            }
            else if (isArray(element)) {
                auxObj = mongoInputArrayBuilder(element)
            }
        })
    }

    return auxObj
}

export const toMongoValue = (val:any, isId = false) => {
    if (typeof val ==='boolean') return val
    if (isNumber(val)) return val
    if(isDate(val)) return val
    if (isString(val)) {
        if (val.indexOf('(') > -1) {
            let valArray:Array<String|number|Object> = val.replace('(', '').replace(')', '').split(',')

            valArray = valArray.map((v:any) => {
                return toMongoValue(v, isId)
            })

            return valArray
        }
        else if (isId) {
            const objId = new ObjectId(val)
            
            return objId
        }
        else
            return val
    }
    return val
}
export const toMongoOperator = (op:string) => {
    switch(op) {
        case '<'        : return ('$lt')
        case '<='       : return ('$lte')
        case '='        : return ('$eq')
        case '!='       : return ('$ne')
        case '>'       : return ('$gt')
        case '>='       : return ('$gte')
        case 'in'       : return ('$in')
        case 'not in'   : return ('$nin')
    }
}

export const isString = (elem:any) => {
    const stringConstructor = ''.constructor;

    return elem.constructor === stringConstructor
}

export const isNumber = (elem:any) => {
    return typeof elem == 'number'
}

export const isDate = (elem:any) => {
    return elem instanceof Date && !isNaN(elem.valueOf())
}
export const isArray = (elem:any) => {
    const arrayConstructor = [].constructor;

    return elem.constructor === arrayConstructor
}

export const isObject = (elem:any) => {
    const objectConstructor = ({}).constructor;

    return elem.constructor === objectConstructor
}