
import { MysqlDB } from '../core/database/orm/mysql/mysql'
import { PostgressSqlDB}  from '../core/database/orm/postgress/postgress'
import { MongoDB } from '../core/database/orm/mongo/mongoDB'
import { BigqueryService } from '../core/database/gcp/bigquery/bigquery'
import { DatastoreService } from '../core/database/gcp/datastore/datastore'
import { ElasticService } from '../core/database/gcp/elastic/elastic'
import { TYPES_DATA_BASE } from './types.enum'

export const getDataBase = () => {
    switch(process.env.DATABASE) {
        case TYPES_DATA_BASE.MYSQL:
            return MysqlDB.getConnection({ host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, database: process.env.MYSQL_DATABASE })
        
        case TYPES_DATA_BASE.POSTGRESS_SQL:
            return PostgressSqlDB.getConnection({ host: process.env.PGSQL_HOST, user: process.env.PGSQL_USER, password: process.env.PGSQL_PASSWORD, database: process.env.PGSQL_DATABASE })
    
        case TYPES_DATA_BASE.BIGQUERY:
            return BigqueryService.getConnection({ serviceAccountRoute: process.env.GOOGLE_APPLICATION_CREDENTIALS })
        
        case TYPES_DATA_BASE.MONGO_DB:
            return MongoDB.getConnection({ host: process.env.MONGO_HOST, user: process.env.MONGO_USER, password: process.env.MONGO_PASSWORD, dbName: process.env.MONGO_DATABASE, port: process.env.MONGO_PORT })

        case TYPES_DATA_BASE.DATASTORE:
            return DatastoreService.getConnection({ serviceAccountRoute: process.env.GOOGLE_APPLICATION_CREDENTIALS })

        case TYPES_DATA_BASE.ELASTIC:
            return ElasticService.getConnection({ serviceAccountRoute: process.env.GOOGLE_APPLICATION_CREDENTIALS })

        case TYPES_DATA_BASE.FILE:
            return ElasticService.getConnection(null)    
        
        default:
            return MysqlDB.getConnection({ host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD })            
    }    
}

export const DATABASE = getDataBase()
